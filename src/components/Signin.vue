
<script setup>
import { reactive } from "vue";

const formSuccess = ref(false);
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

console.log("fieldErr", fieldErr);

const fields = [
  { fieldName: "email", placeholder: "Email", type: "text" },
  { fieldName: "password", placeholder: "Password", type: "password" },
  {
    fieldName: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
  },
  {
    fieldName: "phoneNo",
    placeholder: "Phone No.",
    type: "number",
  },
  { fieldName: "dob", placeholder: "DOB", type: "date" },
];

const countries = [
  { countryName: "United States", value: "USA" },
  { countryName: "India", value: "IN" },
  { countryName: "Canada", value: "CAN" },
  { countryName: "United Kingdom", value: "UK" },
  { countryName: "Australia", value: "AUS" },
];

const validate = () => {
  Object.entries(fieldValues).map(([key, value]) => {
    if (!value) {
      return (fieldErr[key] = "Field value is required");
    }
    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      fieldErr[key] = "Invalid Email";
    }
    if (key === "phoneNo" && value?.length !== 10) {
      fieldErr[key] = "Invalid Phone No.";
    }
    if (key === "dob" && new Date(value) > new Date()) {
      fieldErr[key] = "Invalid DOB";
    }
    if (key === "confirmPassword" && fieldValues["password"] !== value) {
      fieldErr[key] = "Password doesn't match";
    }
  });
};

const handleSubmit = () => {
  validate();
  const isValid = Object.values(fieldErr).every((i) => i === "");
};

const handleCountrySelect = (data) => {
  fieldValues["country"] = data;
  fieldErr["country"] = "";
};

const handleChange = (data, fieldName) => {
  fieldValues[fieldName] = data;
  fieldErr[fieldName] = "";
};
</script>

<template>
  <h1>Sign Up</h1>
  <div
    class="mt-3 d-flex flex-column"
    v-for="each in fields"
    :key="each.fieldName"
  >
    <label>{{ each.placeholder }}</label>
    <input
      class="form-control"
      :type="each.type"
      :placeholder="each.placeholder"
      :style="{ borderColor: '' }"
      v-model="fieldValues[each.fieldName]"
      @input="(e) => handleChange(e.target.value, each.fieldName)"
    />
    <span class="text-danger">{{ fieldErr[each.fieldName] }}</span>
  </div>
  <div class="mt-3 d-flex flex-column">
    <label for="country">Country</label>
    <select
      class="form-control"
      id="country"
      name="country"
      v-model="fieldValues['country']"
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
    <span class="text-danger">{{ fieldErr["country"] }}</span>
  </div>
  <button class="mt-5 btn btn-primary btn-lg" @click="handleSubmit">
    Sign Up
  </button>
</template>

<style>
</style>