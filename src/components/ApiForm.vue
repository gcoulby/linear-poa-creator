<template>
  <div class="sm:w-full md:w-1/2 overflow-hidden m-auto transition-all duration-500" :class="height">
    <div class="w-full h-20 text-4xl p-2 text-center cursor-pointer" @click="toggleHeight">⚙️</div>
    <div class="w-full flex flex-row justify-center items-center">
      <label for="name" class="w-1/4">API Key</label>
      <input type="password" class="w-3/4 border-2 border-slate-500 bg-slate-700 p-2 m-2" placeholder="API Key" v-model="apiKey" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
const { apiKey, issues, issueIdPrefix, user, getIssueByNumber } = useApi()

const height = ref('h-16')
const toggleHeight = () => {
  height.value = height.value === 'h-16' ? 'h-40' : 'h-16'
}
</script>

<style scoped></style>
