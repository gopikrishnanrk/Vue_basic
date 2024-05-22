<template>
  <CommonTable :data="state.users" :column="headers" />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getAllUser } from "../../service/userService";
import { getUserDetails, removeUserDetails } from "../../utils/localStorage";
import { useRouter } from "vue-router";
import CommonTable from "../../common/CommonTable.vue";

const headers = [
  { title: "ID", key: "id" },
  { title: "Email", key: "email" },
  { title: "DOB", key: "dob" },
  { title: "Country", key: "country" },
  // {
  //   title: "Full Name",
  //   key: "fullName",
  //   value: (item) => `${item.name.first} ${item.name.last}`,
  // },
];

const state = reactive({
  users: null,
  selectedUser: null,
});

const getList = async () => {
  try {
    const { data } = await getAllUser();
    state.users = data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const userData = getUserDetails();

onMounted(() => {
  getList();
  getUserDetails();
});
</script>

<style scoped>
</style>