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
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Phone No</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="each in state?.users" :key="each.email">
          <td>{{ each.id }}</td>
          <td>{{ each.email }}</td>
          <td>{{ each.dob }}</td>
          <td>{{ each.phoneNo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getAllUser } from "../../service/userService";
import { getUserDetails, removeUserDetails } from "../../utils/localStorage";
import { useRouter } from "vue-router";
import dummyUser from "../../assets/dummy-usr-icon.svg";

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
.table-container {
  width: 100%;
  overflow-x: auto; /* Add horizontal scrollbar if table overflows */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:nth-child(odd) {
  background-color: #cacaca;
}

tr:hover {
  background-color: #ddd;
}
</style>