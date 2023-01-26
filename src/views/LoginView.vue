<script setup>
import router from "@/router";
import { useUserActions } from "@/stores/user";
import { ref } from "vue";
import LogoSvgs from "../components/LogoSvgs.vue";
const { login } = useUserActions();

const username = ref(null);
const password = ref(null);

const handleSubmit = () => {
  login({ username: username.value, password: password.value });
  router.push({ name: "dashboard" });
};
</script>

<template>
  <div class="login">
    <form class="login__form" @submit.prevent="handleSubmit">
      <LogoSvgs class="login__logo" lightModeGradient />
      <label class="login__label" for="login-input-user">Usuário</label>
      <input
        id="login-input-user"
        class="login__input"
        v-model="username"
        type="text"
        name="username"
        required
      />
      <label class="login__label" for="login-input-pass">Senha</label>
      <input
        id="#login-input-pass"
        class="login__input"
        v-model="password"
        type="password"
        name="password"
        required
      />
      <button
        class="login__submit"
        type="submit"
        :disabled="!username || !password"
      >
        Logar-se
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  @include center;

  position: relative;
  height: 100vh;
  background-color: var(--color-blue);

  &__form {
    margin: auto;
    width: 100%;
    max-width: 440px;
    padding: 40px 32px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: var(--color-background);
    box-shadow: var(--shadow);
  }

  &__logo {
    justify-content: center;
    padding-bottom: 32px;
    margin-bottom: 16px;
    border-bottom: 2px dashed var(--color-blue-helper);

    :deep(.fa-icon) {
      width: 2rem;
      height: 2rem;
    }
  }

  &__label {
    font-weight: 600;
  }

  &__input {
    padding: 6px 12px;
  }

  &__submit {
    font-weight: 600;
    padding: 8px 12px;
    margin-top: 12px;
    border-radius: 120px;
    background-color: var(--color-green);
    border: 1px solid var(--color-green-helper);
    color: var(--color-black);
  }
}
</style>
