<template>
  <span class="text-danger">{{ errorText }}</span>
</template>

<script setup>
defineProps({
  errorText: String,
});
</script>

<style>
</style>