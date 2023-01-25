<script setup>
import { RouterView } from "vue-router";

import DashboardTable from "@/components/DashboardTable.vue";
import { useTablesStore } from "@/stores/tables";

const { tables } = useTablesStore();
</script>
<template>
  <div class="container">
    <div class="view">
      <DashboardTable v-for="table in tables" v-bind="table" :key="table.id" />
    </div>
  </div>
  <RouterView />
</template>

<style lang="scss" scoped>
.container {
  @include container;
}

.view {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 36px 32px;
  padding: 100px 0 40px;
}
</style>
