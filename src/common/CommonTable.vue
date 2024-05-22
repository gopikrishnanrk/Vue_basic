<template>
  <div :class="className">
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
});
</script>

<style scoped>
.table-common-style {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
}
</style>