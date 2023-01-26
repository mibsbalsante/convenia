<script setup>
import { useUserStore, useUserActions } from "@/stores/user";
import IconUtensils from "@fa/solid/utensils.svg";
import IconBowlFood from "@fa/solid/bowl-food.svg";
import IconMugHot from "@fa/solid/mug-hot.svg";

const { username, isLoggedIn } = useUserStore();
const { logout } = useUserActions();
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__icons">
        <IconUtensils id="logo-1" />
        <IconBowlFood id="logo-2" />
        <IconMugHot id="logo-3" />
        <svg>
          <defs>
            <linearGradient id="logo-gradient" gradientTransform="rotate(80)">
              <stop offset="55%" stop-color="#dcedc1" />
              <stop offset="100%" stop-color="#ff8b94" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <nav v-if="isLoggedIn">
        <span
          >Logado como <strong>{{ username }}</strong></span
        >
        <button class="header__logout" @click="logout">Sair</button>
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

  &__icons {
    @include center;

    gap: 12px;

    @media (prefers-color-scheme: dark) {
      svg {
        fill: url("#logo-gradient");
      }
    }
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
