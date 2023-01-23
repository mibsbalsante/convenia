import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", () => {
  const menu = ref([
    {
      name: "Comida X",
      price: "90.90",
      quantity: 5,
    },
    {
      name: "Bebida Y",
      price: "1.99",
      quantity: -1,
    },
  ]);
  const availableMenu = computed(() =>
    menu.value.filter(({ quantity }) => quantity != 0)
  );

  function removeFromMenu(id) {
    menu[id].quantity = -1;
  }

  return { menu, availableMenu, removeFromMenu };
});
