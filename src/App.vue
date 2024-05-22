<script setup>
import { useRoute } from "vue-router";
import router from "./routes/router";
import { getUserDetails } from "./utils/localStorage";
import Header from "./layout/Header.vue";
import Sidebar from "./layout/Sidebar.vue";
const isLoggedIn = getUserDetails();
</script>


<template>
  <div v-if="!isLoggedIn"><router-view /></div>
  <div v-else>
    <Header />
    <div class="layout">
      <Sidebar />
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh; /* Full height of the viewport */
}

.page-content {
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
}
</style>