<template>
  <div>
    <ApiFormVue />
    <h1 class="text-3xl">Plan of Action Creator</h1>

    <div class="sm:w-full md:w-2/3 m-auto flex flex-col justify-center items-center">
      <div class="mt-3 w-full flex flex-row justify-center items-center">
        <p class="w-full bg-slate-800 border border-slate-500 rounded-md p-6 m-2 text-xs">
          Hi <b>{{ user?.displayName }}</b
          >!<br />
          To use the app, click the cog wheel above and enter your API key in the box above
          <br /><i>(this will be stored between sessions in your browser's local storage)</i>.<br /><br />
          Add a prefix in the next field, and use the issue selector to include the issues you want to include in the PoA.<br />
        </p>
      </div>
      <div class="w-full flex flex-row justify-center items-center">
        <label for="prefix" class="w-1/4">Prefix</label>
        <input
          type="text"
          class="w-3/4 border-2 border-slate-500 bg-slate-700 p-2 m-2"
          placeholder="Message Prefix"
          v-model="messagePrefix" />
      </div>
      <div class="w-full flex flex-row justify-center items-center">
        <label for="issues" class="w-1/4">Issues</label>
        <!-- <AutoCompleteVue class="w-3/4" :issueTags="issueTags" /> -->
        <div class="w-3/4 px-2">
          <multiselect
            class="w-full"
            v-model="selectedTags"
            :options="computedOptions"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
            label="name"
            track-by="name"
            placeholder="Add a tag"></multiselect>
        </div>
      </div>

      <div class="w-full flex flex-row justify-center items-center">
        <label for="issues" class="w-1/4">Output</label>
        <textarea
          rows="4"
          class="w-3/4 border-2 border-slate-500 bg-slate-700 p-2 m-2"
          placeholder="Output"
          v-model="computedIssueOutput"
          readonly />
      </div>
      <button
        class="transition-all ease-in-out duration-300 text-white py-2 px-10 m-2 border border-slate-600"
        :class="buttonColor"
        @click="copyToClipBoard">
        Copy to Clipboard <span v-if="showTick">✓</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue'
import { Issue } from '@linear/sdk'
import { useApi } from '@/composables/useApi'
import Multiselect from 'vue-multiselect'
import { Tag } from '@/types'
import ApiFormVue from '@/components/ApiForm.vue'

const { issues, issueIdPrefix, user, getIssueByNumber } = useApi()

const messagePrefix = ref('Morning. My PoA is:')
const buttonColor = ref('bg-slate-800')

const showTick = ref(false)

// Options available for selection
const options = ref<Tag[]>([{ name: 'Vue.js' }, { name: 'React' }, { name: 'Angular' }])

const computedOptions = computed(() => {
  return issues.value.map((issue) => {
    return { name: `${issueIdPrefix.value}-${issue.number} - ${issue.title}` }
  })
})

// Currently selected tags
const selectedTags = ref<Tag[]>([])

// Method to add a new tag
function addTag(newTagName: string) {
  const newTag = { name: newTagName }
  if (!options.value.find((option) => option.name === newTagName)) {
    options.value.push(newTag)
  }
  selectedTags.value.push(newTag)
}

const computedIssueOutput = computed(() => {
  let issueOutput = `${messagePrefix.value} \n\n`

  selectedTags.value.forEach((tag, i) => {
    issueOutput += `${i}. ${tag.name}\n`
    // const issue = getIssueByNumber(parseInt(tag.name.split('-')[1]))
    // issueOutput += `\t\t\t${issue?.url}\n`
  })

  issueOutput += '\n'
  issueOutput += '-----------------------------------\n'

  selectedTags.value.forEach((tag) => {
    const issue = getIssueByNumber(parseInt(tag.name.split('-')[1]))
    issueOutput += `${issue?.identifier}: ${issue?.url}\n`
  })

  return issueOutput
})

const copyToClipBoard = () => {
  buttonColor.value = 'bg-green-500'
  showTick.value = true
  setTimeout(() => {
    buttonColor.value = 'bg-slate-800'
    showTick.value = false
  }, 1000)
  navigator.clipboard.writeText(computedIssueOutput.value || '')
}
</script>

<style>
.multiselect__tags {
  background-color: #334155 !important;
  border: 2px solid #64748b;
  color: #e2e8f0;
}

.multiselect__tags input,
.multiselect__content {
  background-color: #334155 !important;
  color: #e2e8f0;
}
</style>
