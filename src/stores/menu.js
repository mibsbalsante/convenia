import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";

const menuStore = defineStore("menu", () => {
  const menu = ref([
    {
      id: 1,
      name: "Comida X",
      price: "90.90",
      quantity: 5,
    },
    {
      id: 2,
      name: "Bebida Y",
      price: "1.99",
      quantity: -1,
    },
  ]);
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
