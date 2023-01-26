import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";

import { menu as menuJSON } from "@/utils/menu";

const menuStore = defineStore("menu", {
  state: () => {
    const menu = ref(menuJSON);

    const availableMenu = computed(() =>
      menu.value.filter(({ quantity }) => quantity > 0)
    );

    const _findMenuItemInd = (itemId) =>
      menu.value.findIndex(({ id }) => id === itemId);

    function removeQuantityFromMenu(id, quantity) {
      const ind = _findMenuItemInd(id);
      menu.value[ind].quantity -= quantity;
    }

    function addQuantityBackToMenu(id, quantity) {
      const ind = _findMenuItemInd(id);
      menu.value[ind].quantity += quantity;
    }

    return {
      menu,
      availableMenu,
      removeQuantityFromMenu,
      addQuantityBackToMenu,
    };
  },
  persist: true,
});

export const useMenuStore = () => storeToRefs(menuStore());
export const useMenuActions = () => menuStore();
