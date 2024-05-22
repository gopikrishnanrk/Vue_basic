<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <h2 class="sidebar-heading">Sidebar</h2>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/text-management">Page</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.sidebar-container {
  display: flex;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #333;
  color: #fff;
  overflow: auto;
  padding: 20px 0px 0px 10px;
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