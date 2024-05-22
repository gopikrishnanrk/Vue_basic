<template>
  <div :class="className">
    <div class="table-header">
      <div class="d-flex justify-content-end p-4">
        <button @click="addClick" type="button" class="btn btn-outline-primary">
          Add
        </button>
      </div>
    </div>
    <v-data-table
      class="table-common-style"
      :items="data ?? []"
      :headers="column"
    ></v-data-table>
  </div>
</template>

<script setup>
import { VDataTable } from "vuetify/components/VDataTable";
defineProps({
  data: Array,
  column: Array,
  className: String,
  addClick: Function,
});
</script>

<style scoped>
.table-common-style {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  border-radius: 5px;
}
.table-header {
  background-color: #fff;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>