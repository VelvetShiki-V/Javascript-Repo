<script lang="ts" setup>
import { ref } from 'vue'

const str = ref('')
</script>

<template>
  <h1>User PAGES</h1>
  <mavon-editor v-model="str" style="height: calc(100vh - 260px)" />
</template>
