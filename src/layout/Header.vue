<script setup>
import { useRouter } from "vue-router";
import { getUserDetails, removeUserDetails } from "../utils/localStorage";
import dummyUser from "../assets/dummy-usr-icon.svg";

const router = useRouter();
const userData = getUserDetails();

const handleLogout = () => {
  router.push("/");
  removeUserDetails();
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand">Home</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">
      <img
        :src="userData?.image ? userData?.image : dummyUser"
        width="30"
        height="30"
        alt=""
      />
    </a>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active"
          >{{ userData?.email ?? "" }}<span class="sr-only"> (current)</span></a
        >
        <button class="nav-item nav-link" @click="handleLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<style>
</style>