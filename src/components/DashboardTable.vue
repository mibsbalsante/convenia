<script setup>
import { computed } from "vue";

import { useOrdersStore } from "@/stores/orders";

const { orders } = useOrdersStore();

const props = defineProps({
  id: Number,
  activeOrderId: String,
});

const bookingTimeHasStarted = computed(
  () =>
    orders.value.find(
      ({ tableId, bookingStartTime }) =>
        tableId === props.id && new Date() > bookingStartTime
    ) //props.bookingStartTime && new Date() > props.bookingStartTime
);
</script>

<template>
  <RouterLink
    :to="`/table/${id}`"
    :class="{
      table: true,
      'table--filled': activeOrderId,
      'table--late': bookingTimeHasStarted,
    }"
    activeClass="table--selected"
  >
    <h3 class="table__heading">Mesa {{ id }}</h3>

    <span v-if="activeOrderId">Preenchida</span>
    <span v-else-if="bookingTimeHasStarted">Reservada</span>
    <span v-else>Disponível</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.table {
  text-align: center;
  text-decoration: none;
  min-width: 140px;
  min-height: 124px;
  padding: 40px 20px;
  font-size: 14px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  background-color: var(--color-green);
  border: 1px solid var(--color-green-helper);
  outline-offset: 0;
  outline-width: 3px;
  outline-style: solid;
  outline-color: transparent;

  &:hover {
    outline-color: var(--color-blue-helper);
  }

  &:focus,
  &:focus-visible {
    outline-color: var(--color-text);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      outline-color: var(--color-green-helper);
    }
  }

  &--late {
    background-color: var(--color-red);
    border-color: var(--color-red-helper);
  }

  &--filled {
    background-color: var(--color-yellow);
    border-color: var(--color-yellow-helper);
  }

  &--selected {
    background-color: var(--color-orange);
    border-color: var(--color-orange-helper);

    &:focus,
    &:focus-visible {
      outline-color: var(--color-red-helper);
    }

    @media (prefers-color-scheme: dark) {
      &:focus,
      &:focus-visible {
        outline-color: var(--color-yellow-helper);
      }
    }
  }
}

.table__heading {
  font-size: 24px;
  font-weight: 600;

  margin: 0 0 8px;
}
</style>
