<template>
  <div :class="className">
    <v-data-table :items="data ?? []" :headers="column"></v-data-table>
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

<style>
</style>