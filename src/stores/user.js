import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";

const userStore = defineStore("user", {
  state: () => {
    const username = ref(null);
    const isLoggedIn = computed(() => !!username.value);

    function login({ username: user, password }) {
      if (user && password) username.value = user;
    }

    function logout() {
      username.value = null;
    }

    return { username, isLoggedIn, login, logout };
  },
  persist: true,
});

export const useUserStore = () => storeToRefs(userStore());
export const useUserActions = () => userStore();
