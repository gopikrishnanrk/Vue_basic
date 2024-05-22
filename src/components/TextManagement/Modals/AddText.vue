<template>
  <div>
    <CustomModal class="" :show="isOpen" @close="closeModal">
      <template #header>
        <h2>Create post</h2>
      </template>
      <template #body>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Write post</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="text"
            @onchange="handleChange"
          />
        </div>
      </template>
      <template #footer>
        <button @click="closeModal" class="btn btn-danger">Close</button>
        <button @click="handleSubmit" class="btn btn-primary m-2">Save</button>
      </template>
    </CustomModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomModal from "../../../common/CustomModal.vue";
import { getUserDetails } from "../../../utils/localStorage";
import { postText } from "../../../service/textService";
const text = ref("");
const userData = getUserDetails();

const handleSubmit = () => {
  const params = {
    post: text.value,
    userId: userData.id,
  };

  submitText(params);
};

const submitText = async (params) => {
  try {
    const { data } = await postText(params);
    alert("Post created successfully");
    emit("onSubmit");
  } catch (error) {
    alert(error);
    console.error("Error:", error);
  }
};
const emit = defineEmits(["onSubmit"]);

defineProps({
  isOpen: Boolean,
  closeModal: Function,
});
</script>
