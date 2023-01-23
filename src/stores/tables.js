import { ref } from "vue";
import { defineStore } from "pinia";

export const useTablesStore = defineStore("tables", () => {
  const tables = ref([{}]);

  return { tables };
});
