

<script setup>
import { reactive, ref } from "vue";
import ButtonVue from "../../common/Button.vue";
import ErrorText from "../../common/ErrorText.vue";
import { fields, countries, loginFields } from "/src/utils/formFields.js";
import {
  isEmailValid,
  isPhoneNoValid,
  isDateValid,
  comparePassword,
} from "/src/utils/validation.js";

const formSuccess = ref(false);
const loader = ref(false);
const fieldValues = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  phoneNo: "",
  country: "",
  dob: "",
});

const fieldErr = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  phoneNo: "",
  country: "",
  dob: "",
});

const resetFieldValues = () => {
  fieldValues.email = "";
  fieldValues.password = "";
  fieldValues.confirmPassword = "";
  fieldValues.phoneNo = "";
  fieldValues.country = "";
  fieldValues.dob = "";
};

const submitValidation = () => {
  if (formSuccess.value) {
    Object.entries(fieldValues).map(([key, value]) => {
      debugger;
      if (
        !value &&
        loginFields.map(({ fieldName }) => fieldName).includes(key)
      ) {
        fieldErr[key] = "Field value is required";
      }
    });
    return;
  }

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
    if (formSuccess.value) {
      alert("User added successfully");
      return;
    }
    loader.value = true;
    setTimeout(() => {
      formSuccess.value = true;
      loader.value = false;
      resetFieldValues();
    }, 2000);
  }
};

const handleCountrySelect = (data) => {
  fieldValues["country"] = data;
  fieldErr["country"] = "";
};

const handleChange = (data, fieldName) => {
  fieldValues[fieldName] = data;
  handleChangeValidation(fieldName, data);
};
</script>

<template>
  <div :class="`form-container ${formSuccess ? 'create-user' : ''}`">
    <h1>{{ formSuccess ? "Create User" : "Sign Up" }}</h1>
    <div
      class="mt-3 d-flex flex-column"
      v-for="each in formSuccess ? loginFields : fields"
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
        @input="(e) => handleChange(e.target.value, each.fieldName)"
      />
      <ErrorText :errorText="fieldErr[each.fieldName]" />
    </div>
    <div class="mt-3 d-flex flex-column" v-if="!formSuccess">
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

<style >
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
  background-image: url("../../assets/JPG _MEDIUM.jpg");
}

.form-container {
  width: 400px;
  margin: 100px 50px 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.create-user {
  background-color: rgba(255, 255, 255, 0.8);
  background-image: url("../../assets/Blue Modern Geometric LinkedIn Banner.png");
}

.input-err {
  border-color: red;
}
</style>