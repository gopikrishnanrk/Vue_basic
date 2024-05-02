
<script setup>
import { reactive, ref } from "vue";

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
  if (isValid) {
    formSuccess.value = true;
  }
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
  <div v-if="!formSuccess">
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
        :style="{ borderColor: fieldErr[each.fieldName] ? 'red' : '' }"
        v-model="fieldValues[each.fieldName]"
        @input="(e) => handleChange(e.target.value, each.fieldName)"
      />
      <span class="text-danger">{{ fieldErr[each.fieldName] }}</span>
    </div>
    <div class="mt-3 d-flex flex-column">
      <label for="country">Country</label>
      <select
        class="form-control"
        name="country"
        :style="{ borderColor: fieldErr['country'] ? 'red' : '' }"
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
  </div>
  <div v-if="formSuccess" class="image-container">
    <img
      src="https://images.ctfassets.net/dfcvkz6j859j/3yyuVQqgzMOMr2AGytPI4u/91be75a9b2d8debb8750270d0b3d52d4/Web-Analytics-Dashboard.png"
      alt="..."
    />
  </div>
</template>

<style>
/* Ensure the image takes up the full viewport */
.image-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Center the image horizontally and vertically */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Ensure the image resizes while maintaining aspect ratio */
.image-container img {
  max-width: 100%;
  max-height: 100%;
}
</style>