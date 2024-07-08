<template>
  <main class="w-full h-full overflow-auto bg-slate-950 text-white">
    <PoACreatorVue />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import PoACreatorVue from './components/PoACreator.vue'
export default defineComponent({
  name: 'App',
  components: {
    PoACreatorVue
  }
})
</script>

<style>
html,
body,
#app {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
