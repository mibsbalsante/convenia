<script setup>
import { useUserStore, useUserActions } from "@/stores/user";

const { username, isLoggedIn } = useUserStore();
const { logout } = useUserActions();
</script>

<template>
  <header class="header">
    <div class="container">
      <img src="#" alt="img header" />
      <nav v-if="isLoggedIn">
        <span
          >Logado como <strong>{{ username }}</strong></span
        >
        <button class="logout" @click="logout">Sair</button>
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
}

.container {
  @include container;
  @include center;

  height: 60px;
}

.logout {
  appearance: none;
  background-color: var(--color-black);
  color: var(--color-white);
  min-width: 96px;
  padding: 8px 24px;
  border-radius: 120px;
  border: 0 none;
  font-weight: 600;
  cursor: pointer;
}
</style>
