<template>
  <div className="container login-container">
    <h1>Login</h1>
    <div class="mt-5">
      <div className="row">
        <div className="col">
          <button
            type="button"
            @click="() => navigateTo('/signup')"
            className="btn btn-success btn-lg mb-3 w-100"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="button"
            @click="() => navigateTo('/login')"
            className="btn btn-primary btn-lg mb-3 w-100"
          >
            Login
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-info btn-lg mb-3 w-100">
            Google Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style>
.login-container {
  width: 400px;
  margin: 100px 50px 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>