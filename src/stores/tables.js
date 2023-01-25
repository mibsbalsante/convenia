import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";

const emptyTable = {
  activeOrderId: null,
};

const tablesStore = defineStore("tables", () => {
  const tables = ref(
    Array.from(Array(20), (_, ind) => ({
      id: ind + 1,
      ...emptyTable,
    }))
  );

  const selectedTable = ref({ ind: -1, table: null });

  function selectTable(ind) {
    if (!ind)
      selectedTable.value = {
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

  function fillTable(ind, activeOrderId) {
    tables.value[ind].activeOrderId = activeOrderId;
  }

  function clearTable(ind) {
    tables.value[ind] = {
      ...tables.value[ind],
      ...emptyTable,
    };
  }

  return {
    tables,
    selectedTable,
    selectTable,
    fillTable,
    clearTable,
  };
});

export const useTablesStore = () => storeToRefs(tablesStore());
export const useTablesActions = () => tablesStore();
