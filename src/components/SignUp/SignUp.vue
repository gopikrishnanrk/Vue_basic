

<script setup>
import { reactive, ref } from "vue";
import ButtonVue from "../../common/Button.vue";
import ErrorText from "../../common/ErrorText.vue";
import { fields, countries } from "/src/utils/formFields.js";
import {
  isEmailValid,
  isPhoneNoValid,
  isDateValid,
  comparePassword,
} from "/src/utils/validation.js";
import { checkUserValid, postUser } from "../../service/userService";
import { setUserDetails } from "../../utils/localStorage";
import { useRoute, useRouter } from "vue-router";
import { loginFields } from "../../utils/formFields";

const route = useRoute();
const router = useRouter();
const currentPath = route.path;

const isLogin = currentPath === "/login";
const fieldArr = isLogin ? loginFields : fields;
const fieldObj = fieldArr?.reduce((acc, crr) => {
  acc[crr.fieldName] = "";
  return acc;
}, {});
const fieldInitialState = isLogin ? fieldObj : { ...fieldObj, country: "" };
const errInitialState = isLogin ? fieldObj : { ...fieldObj, country: "" };

const formSuccess = ref(false);
const loader = ref(false);
const fieldValues = reactive({ ...fieldInitialState });
const fieldErr = reactive({ ...errInitialState });

const postUserDetails = async (params) => {
  try {
    const { data } = await postUser(params);
    setUserDetails(fieldValues);
    router.push("/dashboard");
    alert("Registered successfully");
  } catch (error) {
    alert(error);
    console.error("Error:", error);
  }
};

const authenticateUser = async (email, password) => {
  try {
    const { data } = await checkUserValid(email, password);
    const userDetails = data?.[0];
    if (userDetails) {
      setUserDetails(userDetails);
      router.push("/dashboard");
      return;
    }
    alert("Invalid login or password");
  } catch (error) {
    alert(error);
    console.error("Error:", error);
  }
};

const submitValidation = () => {
  Object.entries(fieldValues).map(([key, value]) => {
    if (!value) {
      return (fieldErr[key] = "Field value is required");
    }
  });
};

const handleChangeValidation = (key, value) => {
  switch (key) {
    case "email":
      if (!isEmailValid(value)) {
        fieldErr[key] = "Invalid Email";
      } else fieldErr[key] = "";
      break;
    case "phoneNo":
      if (!isPhoneNoValid(value)) {
        fieldErr[key] = "Invalid Phone No.";
      } else fieldErr[key] = "";
      break;
    case "dob":
      if (isDateValid(value)) {
        fieldErr[key] = "Invalid DOB";
      } else fieldErr[key] = "";
      break;
    case "confirmPassword":
      if (comparePassword(fieldValues["password"], value)) {
        fieldErr[key] = "Password doesn't match";
      } else fieldErr[key] = "";
      break;
    default:
      fieldErr[key] = "";
      break;
  }
};

const handleFocus = (event) => {
  const { value, name } = event.target;
  if (!value) fieldErr[name] = "Field value is required";
};

const handleSubmit = () => {
  submitValidation();

  const isValid = Object.values(fieldErr).every((i) => i === "");

  if (isValid) {
    if (isLogin) {
      authenticateUser(fieldValues.email, fieldValues.password);
      return;
    }
    loader.value = true;
    setTimeout(() => {
      // const formData = new FormData();
      // formData.append("image", fieldValues.image);
      postUserDetails(fieldValues);
      formSuccess.value = true;
      loader.value = false;
    }, 2000);
  }
};

const handleCountrySelect = (data) => {
  fieldValues["country"] = data;
  fieldErr["country"] = "";
};

const handleChange = (target, fieldName) => {
  const { value } = target;
  if (fieldName === "image") {
    const img = target.files?.[0];
    fieldValues[fieldName] = img;
  }
  fieldValues[fieldName] = value;
  handleChangeValidation(fieldName, value);
};
</script>

<template>
  <div class="form-container">
    <h1>{{ isLogin ? "Login" : "Sign Up" }}</h1>
    <div
      class="mt-3 d-flex flex-column"
      v-for="each in isLogin ? loginFields : fields"
      :key="each.fieldName"
    >
      <label>{{ each.placeholder }}</label>
      <input
        :name="each.fieldName"
        :class="`form-control ${fieldErr[each.fieldName] ? 'input-err' : ''}`"
        :type="each.type"
        :placeholder="each.placeholder"
        v-model="fieldValues[each.fieldName]"
        @blur="handleFocus"
        @input="(e) => handleChange(e.target, each.fieldName)"
      />
      <ErrorText :errorText="fieldErr[each.fieldName]" />
    </div>
    <div class="mt-3 d-flex flex-column" v-if="!isLogin">
      <label for="country">Country</label>
      <select
        class="form-control"
        name="country"
        :class="`form-control ${fieldErr['country'] ? 'input-err' : ''}`"
        v-model="fieldValues['country']"
        @blur="handleFocus"
        @change="(e) => handleCountrySelect(e.target.value)"
      >
        <option
          v-for="each in countries"
          :value="each.value"
          :key="each.countryName"
        >
          {{ each.countryName }}
        </option>
      </select>
      <ErrorText :errorText="fieldErr['country']" />
    </div>
    <ButtonVue
      className="mt-5 btn btn-primary btn-lg w-100"
      @handleSubmit="handleSubmit"
      :loader="loader"
    />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-image: url("../../assets/JPG _MEDIUM.jpg");
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
}

.form-container {
  width: 400px;
  margin: 100px 50px 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-err {
  border-color: red;
}

.image-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
}
</style>