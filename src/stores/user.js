import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";

const userStore = defineStore("user", () => {
  const username = ref("NameName");
  const isLoggedIn = computed(() => !!username.value);

  function login({ username: user, password }) {
    if (user && password) username.value = user;
  }

  function logout() {
    username.value = null;
  }

  return { username, isLoggedIn, login, logout };
});

export const useUserStore = () => storeToRefs(userStore());
export const useUserActions = () => userStore();
