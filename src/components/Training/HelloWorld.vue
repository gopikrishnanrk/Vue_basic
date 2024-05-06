<script setup>
import { onMounted, reactive, ref, watch } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
const counter = ref({
  count: 0,
  user: {
    name: "John",
    age: 30,
  },
});
const state = reactive({
  count: 0,
  user: {
    name: "John",
    age: 30,
  },
});

onMounted(() => {
  console.log("mounted");
});
watch(counter, () => {
  console.log("updating");
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="counter.user.age++">
      count (ref) is {{ counter.user.age }}
    </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <button type="button" @click="state.user.age++">
      count (reactive) is {{ state.user.age }}
    </button>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
