<template>
  <CommonTable
    :data="state.posts"
    :column="headers"
    :addClick="
      () => {
        showModal = true;
      }
    "
  />
  <AddText
    @onSubmit="
      () => {
        showModal = false;
        getList();
      }
    "
    :isOpen="showModal"
    :closeModal="
      () => {
        showModal = false;
      }
    "
  />
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import CommonTable from "../../common/CommonTable.vue";
import AddText from "./Modals/AddText.vue";
import { getUserText } from "../../service/textService";
import { getUserDetails } from "../../utils/localStorage";

const showModal = ref(false);
const state = reactive({
  posts: null,
});

console.log(state.posts);

const headers = [{ title: "Posts", key: "post" }];

const data = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  },
];

const getList = async () => {
  try {
    const { data } = await getUserText(userData.id);
    state.posts = data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const userData = getUserDetails();

onMounted(() => {
  getList();
});
</script>

<style>
</style>