<script setup>
defineProps({
  id: Number,
  orderId: Number,
});
</script>

<template>
  <RouterLink
    :to="`/table/${id}`"
    :class="{ table: true, 'table--filled': !!orderId }"
    activeClass="table--selected"
  >
    Mesa {{ id }}
    <br />
    <span></span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.table {
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  min-width: 140px;
  min-height: 124px;
  padding: 40px 20px;
  font-size: 24px;
  border-radius: 8px;
  font-weight: 600;
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

  &--filled {
    background-color: var(--color-orange);
    border-color: var(--color-orange-helper);
  }

  &--selected {
    background-color: var(--color-yellow);
    border-color: var(--color-yellow-helper);

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
</style>
