<script setup>
import { computed } from "vue";

import router from "@/router";
import TableActive from "@/components/TableActive.vue";
import { useTablesStore, useTablesActions } from "@/stores/tables";
import { useOrdersStore, useOrdersActions } from "@/stores/orders";
import IconClose from "@fa/solid/xmark.svg";

const { selectedTable } = useTablesStore();
const { orders } = useOrdersStore();

const { ind, table } = selectedTable.value;

const { fillTable, clearTable } = useTablesActions();
const { bookTableForOrder, clearTableOrder, startTableOrder } =
  useOrdersActions();

// helpers
const hourAsMiliseconds = 60 * 60 * 1000;
const addOneHour = (date) => new Date(date.getTime() + hourAsMiliseconds);

// current order conected to the table
const activeTableOrder = computed(() =>
  orders.value.find(({ id }) => id === selectedTable.value.table?.activeOrderId)
);

const currentBookedOrder = computed(() => {
  return orders.value.find(
    ({ tableId, serviceHasStarted, bookingStartTime }) =>
      tableId === table.id &&
      !serviceHasStarted &&
      new Date() > bookingStartTime
  );
});

// navigation
const handleGoBack = () => router.go(-1);
const handleGoHome = () => router.push("/");

// order-table relationship
const handleClearTable = () => {
  clearTable(ind);
  clearTableOrder(currentBookedOrder.value.id);
  handleGoHome();
};
const handleBooking = () => {
  bookTableForOrder({
    tableId: table.id,
    bookingStartTime: new Date(),
    bookingEndTime: addOneHour(new Date()),
    personName: "Person Name",
    personContact: "+5511999999999",
  });
  handleGoHome();
};
const handleOrder = () => {
  const orderId = startTableOrder(
    currentBookedOrder.value || {
      tableId: table.id,
    }
  );
  fillTable(ind, orderId);
};
const handlePayment = () => {
  clearTable(ind);
  clearTableOrder(activeTableOrder.value.id);
  handleGoHome();
};
</script>

<template>
  <div class="overlay" @click.self="handleGoBack">
    <main class="modal" v-if="ind >= 0">
      <button class="modal__close" @click="handleGoBack"><IconClose /></button>
      <h2 class="modal__title">Mesa {{ table.id }}</h2>

      <template v-if="currentBookedOrder">
        <div class="modal__text-content">
          <p class="modal__text">
            Mesa reservada no momento. Gostaria de abrir a comanda?
          </p>
          <p class="modal__text modal__highlight">
            Hora da reserva:
            {{ currentBookedOrder.bookingStartTime.toLocaleTimeString() }} -
            {{ currentBookedOrder.bookingEndTime.toLocaleTimeString() }}
          </p>
        </div>
        <div class="modal__footer">
          <button @click="handleClearTable">Cancelar a reserva</button>
          <button @click="handleOrder">Abrir comanda</button>
        </div>
      </template>

      <template v-else-if="activeTableOrder">
        <div class="modal__info">
          <p><strong>Data:</strong> {{ new Date().toLocaleString() }}</p>
          <p><strong>Cod. comanda:</strong> {{ activeTableOrder?.id }}</p>
        </div>
        <TableActive
          :orderId="activeTableOrder.id"
          :bill="activeTableOrder.bill"
          :payments="activeTableOrder.payments"
        >
          <template #footer="{ disableButtons }">
            <div class="modal__footer">
              <button @click="handlePayment" :disabled="disableButtons">
                Fechar comanda
              </button>
            </div>
          </template>
        </TableActive>
      </template>

      <template v-else>
        <div class="modal__text-content">
          <p class="modal__text">
            Mesa vazia no momento. Gostaria de reservar ou abrir comanda?
          </p>
        </div>
        <div class="modal__footer">
          <button @click="handleBooking">Reservar</button>
          <button @click="handleOrder">Abrir comanda</button>
        </div>
      </template>
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
  height: 100vh;

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

  max-width: 640px;
  width: 90%;
  min-height: 400px;
  max-height: 92vh;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  padding-bottom: 32px;
  background-color: var(--color-background);
  box-shadow: var(--shadow);

  &__close {
    appearance: none;
    position: absolute;
    top: 35px;
    right: 20px;
    background-color: transparent;
    border: 0 none;
  }

  &__text-content {
    margin: auto 0;
  }

  &__title {
    font-size: 1.8rem;
    margin: 0 0 24px;
    padding-bottom: 18px;
    text-align: center;
    border-bottom: 1px solid var(--color-grey);
  }

  &__info {
    margin: 0 24px 24px;
    & > p {
      font-size: 14px;
    }
  }

  &__text {
    text-align: center;
    margin: 0;
  }

  &__highlight {
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    margin-top: 16px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: auto;
    padding-top: 24px;

    & > :is(button, a) {
      appearance: none;
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
