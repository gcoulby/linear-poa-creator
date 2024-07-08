<template>
  <div class="h-16 w-1/2 overflow-hidden m-auto transition-all duration-500 hover:h-40">
    <div class="w-full h-20 text-4xl p-2 text-center cursor-pointer">⚙️</div>
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
</script>

<style scoped></style>
