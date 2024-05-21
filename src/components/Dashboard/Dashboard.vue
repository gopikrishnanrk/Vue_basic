<template>
  <div class="dashboard">
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
            >{{ userData?.email ?? ""
            }}<span class="sr-only"> (current)</span></a
          >
          <button class="nav-item nav-link" @click="handleLogout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
  <CommonTable :data="state.users" :column="headers" />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getAllUser } from "../../service/userService";
import { getUserDetails, removeUserDetails } from "../../utils/localStorage";
import { useRouter } from "vue-router";
import CommonTable from "../../common/CommonTable.vue";
import dummyUser from "../../assets/dummy-usr-icon.svg";

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

const router = useRouter();

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

const handleLogout = () => {
  router.push("/");
  removeUserDetails();
};

const userData = getUserDetails();

onMounted(() => {
  getList();
  getUserDetails();
});
</script>

<style scoped>
</style>