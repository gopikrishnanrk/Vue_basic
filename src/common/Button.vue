<script setup>
const emit = defineEmits(["handleSubmit"]);
defineProps({
  loader: Boolean,
  className: String,
});
console.log("emit", emit);

const handleClick = () => {
  emit("handleSubmit");
};
</script>

<template>
  <button :class="className" :disabled="loader" @click="handleClick">
    <span
      v-if="loader"
      class="spinner-border spinner-border-sm"
      aria-hidden="true"
    ></span>
    {{ loader ? "Loading..." : "Submit" }}
  </button>
</template>

<style>
</style>