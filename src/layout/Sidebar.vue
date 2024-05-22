<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <h2 class="sidebar-heading">Sidebar</h2>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/page">Page</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.sidebar-container {
  display: flex;../assets/404-error.png
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
}
.sidebar {
  width: 250px;
  background-color: #333;
  color: #fff;
  overflow: auto;
  padding-top: 20px;
  flex-shrink: 0;
}
.sidebar a {
  display: block;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
}
.sidebar a:hover {
  background-color: #575757;
}
</style>