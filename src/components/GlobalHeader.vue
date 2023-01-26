<script setup>
import router from "@/router";
import { useUserStore, useUserActions } from "@/stores/user";
import LogoSvgs from "./LogoSvgs.vue";

const { username, isLoggedIn } = useUserStore();
const { logout } = useUserActions();

const handleLogout = () => {
  logout();
  localStorage.clear();
  router.push({ name: "login" });
};
</script>

<template>
  <header v-if="isLoggedIn" class="header">
    <div class="header__container">
      <LogoSvgs class="header__icons" />
      <nav v-if="isLoggedIn">
        <span
          >Logado como <strong>{{ username }}</strong></span
        >
        <button class="header__logout" @click="handleLogout">Sair</button>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--color-blue);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: var(--shadow);

  @media (prefers-color-scheme: dark) {
    background-color: var(--color-blue);
  }

  nav {
    @include center;

    gap: 12px;
  }

  &__container {
    @include container;
    @include center;

    height: 60px;
  }

  &__logout {
    appearance: none;
    background-color: var(--color-black);
    color: var(--color-white);
    min-width: 96px;
    padding: 8px 24px;
    border-radius: 120px;
    border: 0 none;
    font-weight: 600;
  }
}
</style>
