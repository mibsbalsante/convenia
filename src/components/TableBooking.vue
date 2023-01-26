<script setup>
import { ref } from "vue";

const bookingHour = ref(null);
const bookingPersonName = ref(null);
const bookingPersonContact = ref(null);

const formatHourInput = ({ target }) => {
  const hour = Number(target.value);
  if (Number.isNaN(hour) || hour > 24) bookingHour.value = 24;
};
</script>

<template>
  <p class="booking__text">
    Mesa vazia no momento. Gostaria de reservar ou inciar atendimento?
  </p>
  <div class="booking__form">
    <div>
      <label for="#booking-input">Hora da reserva:</label>
      <input
        id="booking-input-hour"
        min="1"
        max="24"
        type="number"
        v-model.number="bookingHour"
        @change="formatHourInput"
      />:00
    </div>
    <div>
      <label for="#booking-input">Nome do cliente:</label>
      <input id="booking-input-name" type="text" v-model="bookingPersonName" />
    </div>
    <div>
      <label for="#booking-input">Contato:</label>
      <input
        id="booking-input-contact"
        type="text"
        v-model="bookingPersonContact"
      />
    </div>
  </div>

  <slot
    name="footer"
    :bookingHour="bookingHour"
    :bookingPersonName="bookingPersonName"
    :bookingPersonContact="bookingPersonContact"
  ></slot>
</template>

<style lang="scss" scoped>
.booking {
  &__text {
    margin-left: auto;
    margin-right: auto;
  }

  &__form {
    border-top: 1px solid var(--color-grey);
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 32px 0 24px;
    margin: 12px 24px 8px;

    & > p {
      font-size: 14px;
      margin: 0 0 8px;
    }

    div {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    }

    label {
      white-space: nowrap;
      margin-right: 6px;
    }

    input[type="text"] {
      width: 100%;
    }

    input[type="number"] {
      max-width: 40px;
      -moz-appearance: textfield;

      /* Chrome, Safari, Edge, Opera */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>
