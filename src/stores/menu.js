import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";

import menuJSON from "@/utils/menu";

const menuStore = defineStore("menu", () => {
  const menu = ref(menuJSON);

  const availableMenu = computed(() =>
    menu.value.filter(({ quantity }) => quantity != 0)
  );

  function removeQuantityFromMenu(ind, quantity) {
    menu.value[ind].quantity = -quantity;
  }

  return { menu, availableMenu, removeQuantityFromMenu };
});

export const useMenuStore = () => storeToRefs(menuStore());
export const useMenuActions = () => menuStore();
