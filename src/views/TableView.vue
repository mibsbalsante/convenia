<script setup>
import router from "@/router";
import { useTablesStore } from "@/stores/tables";

const { selectedTable } = useTablesStore();
const { ind, table } = selectedTable.value;

const handleGoBack = () => router.go(-1);
</script>

<template>
  <div class="overlay" @click.self="handleGoBack">
    <main class="modal" v-if="ind >= 0">
      <h2 class="modal__title">Mesa {{ table.id }}</h2>
      <p class="modal__text" v-if="!table.orderId">
        Mesa vazia no momento. Gostaria de reservar ou abrir comanda?
      </p>
      <div class="modal__footer">
        <button>Reservar</button>
        <button>Abrir comanda</button>
      </div>
    </main>
    <main v-else>
      <table>
        <tbody>
          <tr>
            <td>bebida 1</td>
            <td>R$ 0,00</td>
            <td>1</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div class="modal__footer"><button>Fechar comanda</button></div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  @include center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-text);
    opacity: 0.2;
  }
}

.modal {
  @include container;

  max-width: 600px;
  width: 90%;
  position: relative;
  padding-top: 32px;
  padding-bottom: 32px;
  background-color: var(--color-background);
  box-shadow: var(--shadow);

  &__title {
    margin: 0 0 32px;
    text-align: center;
  }

  &__text {
    text-align: center;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: 32px;

    & > :is(button, a) {
      appearance: none;
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 100px;
      border: 1px solid var(--color-text);
      transition: border-color 0.3s ease-in-out,
        background-color 0.3s ease-in-out, color 0.3s ease-in-out;

      &:hover {
        border-color: var(--color-background);
        background-color: var(--color-text);
        color: var(--color-background);
      }
    }

    & > :is(button, a):only-child {
      margin-left: auto;
    }
  }
}
</style>
