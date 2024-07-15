import { ref, watch } from 'vue'

import { Issue, LinearClient, LinearFetch, User } from '@linear/sdk'

const apiKey = ref('')
export const useApi = () => {
  const user = ref<User | null>(null)
  const issues = ref<Issue[]>([])
  const issueIdPrefix = ref<string>('')

  let linearClient: LinearClient

  async function getCurrentUser() {
    user.value = await linearClient.viewer
  }

  const getIdentifierPrefix = () => {
    if (issues.value.length === 0) return

    const parts = issues.value[0].identifier.split('-')
    if (parts.length > 1) {
      issueIdPrefix.value = parts[0]
    }
  }

  async function getMyIssues() {
    const me = await linearClient.viewer
    const myIssues = await me.assignedIssues()

    if (myIssues.nodes.length) {
      myIssues.nodes.map((issue) => {
        //add if not already in the list

        if (!issues.value.find((i) => i.id === issue.id)) {
          if (issue.completedAt !== undefined || issue.archivedAt !== undefined || issue.canceledAt !== undefined) return
          issues.value.push(issue)
        }
      })
    }
  }

  const storeApiKeyToLocalStorage = () => {
    localStorage.setItem('poa_creator_linear_apiKey', apiKey.value)
  }

  const getApiKeyFromLocalStorage = () => {
    const storedApiKey = localStorage.getItem('poa_creator_linear_apiKey')
    if (storedApiKey) {
      apiKey.value = storedApiKey
    }
  }

  watch(
    () => apiKey.value,
    async () => {
      if (apiKey.value !== '') {
        issues.value = []
        try {
          linearClient = new LinearClient({ apiKey: apiKey.value })
          await getCurrentUser()
          await getMyIssues()
          getIdentifierPrefix()
          storeApiKeyToLocalStorage()
        } catch (error) {
          console.error('Error setting up Linear client', error)
        }
      }
    }
  )

  const getIssueByNumber = (issueNumber: number) => {
    const issue = issues.value.find((i) => i.number === issueNumber)
    return issue
  }

  getApiKeyFromLocalStorage()

  return { apiKey, issues, issueIdPrefix, user, getIssueByNumber }
}
