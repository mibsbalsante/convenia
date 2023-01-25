import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";

const tablesStore = defineStore("tables", () => {
  const tables = ref(
    Array.from(Array(20), (_, ind) => ({ id: ind + 1, orderId: null }))
  );

  const selectedTable = ref({ ind: -1, table: null });

  function selectTable(ind) {
    if (!ind)
      return {
        ind: -1,
        table: null,
      };

    const selectedTableIndex = tables.value.findIndex(
      ({ id }) => id === Number(ind)
    );

    selectedTable.value = {
      ind: selectedTableIndex,
      table: tables.value[selectedTableIndex],
    };
  }

  function clearTable(ind) {
    tables.value[ind].orderId = null;
  }

  return { tables, selectedTable, selectTable, clearTable };
});

export const useTablesStore = () => storeToRefs(tablesStore());
export const useTablesActions = () => tablesStore();
