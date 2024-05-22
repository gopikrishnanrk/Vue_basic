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
          <span className="w-100">
            <GoogleLogin :callback="handleGoogleAuth" prompt />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { GoogleLogin, decodeCredential } from "vue3-google-login";
import { isgoogleIdValid, postUser } from "../../service/userService";
import { setUserDetails } from "../../utils/localStorage";

const router = useRouter();

const handleGoogleAuth = (response) => {
  const { email, picture } = decodeCredential(response.credential);

  const params = {
    email,
    image: picture ?? "-",
    password: "-",
    confirmPassword: "-",
    phoneNo: "-",
    dob: "-",
    country: "-",
  };

  const createUser = async (params) => {
    try {
      const { data } = await isgoogleIdValid(params.email);
      if (!!data.length) {
        setUserDetails(data[0]);
        router.push("/dashboard");
        alert("Registered successfully");
        return;
      }
      const createUser = await postUser(params);
      setUserDetails(data[0]);
      router.push("/dashboard");
      alert("Registered successfully");
    } catch (error) {
      alert(error);
      console.error("Error:", error);
    }
  };

  createUser(params);
};

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