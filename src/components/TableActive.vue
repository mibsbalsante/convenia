<script setup>
import { ref, computed } from "vue";

import { useOrdersStore, useOrdersActions } from "@/stores/orders";
import { useMenuStore } from "@/stores/menu";
import IconCircleMinus from "@fa/solid/circle-minus.svg";
import IconCirclePlus from "@fa/solid/circle-plus.svg";

const props = defineProps({
  orderId: String,
  bill: Array,
  payments: Array,
});

const { orders } = useOrdersStore();
const { addToOrder, removeFromOrder } = useOrdersActions();
const { availableMenu } = useMenuStore();

const currentInd = ref(0);
const quantity = ref(1);

const currentItem = computed(() => availableMenu.value[currentInd.value] || {});
const currentOrder = computed(() =>
  orders.value.find(({ id }) => id === props.orderId)
);
const totalBill = computed(() =>
  currentOrder.value.bill.reduce(
    (total, { price, quantity }) => (total += price * quantity),
    0
  )
);

const handleAddToBill = () => {
  addToOrder(props.orderId, "bill", {
    ...currentItem.value,
    quantity: quantity.value,
  });
  quantity.value = 1;
};

const handleRemoveFromBill = (ind) => {
  removeFromOrder(props.orderId, "bill", ind);
};
</script>

<template>
  <div class="details">
    <div class="details__container">
      <p class="details__id">
        <strong>Cod. atendimento:</strong> {{ orderId }}
      </p>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th class="details__theading-quantity">Quantidade</th>
            <th class="details__theading-price">Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ind) in bill" :key="item.id + ind">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>R$ {{ item.price }}</td>
            <td>
              <button
                @click="handleRemoveFromBill(ind)"
                class="details__button-update"
              >
                <IconCircleMinus />
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <select
                class="details__input-item"
                :value="currentInd"
                @change="currentInd = $event.target.value"
              >
                <option
                  v-for="(item, ind) in availableMenu"
                  :value="ind"
                  :key="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </td>
            <td>
              <input
                class="details__input-quantity"
                type="number"
                :max="currentItem.quantity"
                min="0"
                :value="quantity"
                @change="quantity = Number($event.target.value)"
              />
            </td>
            <td>R$ {{ (currentItem.price || 0).toFixed(2) }}</td>
            <td>
              <button
                @click="handleAddToBill"
                class="details__button-update"
                :disabled="!quantity"
              >
                <IconCirclePlus />
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">Taxa da comanda</td>
            <td>R$ {{ totalBill.toFixed(2) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">Taxa de serviço - 10%</td>
            <td>R$ {{ (totalBill * 0.1).toFixed(2) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">Total:</td>
            <td>R$ {{ (totalBill * 1.1).toFixed(2) }}</td>
            <td></td>
          </tr>
          <tr v-for="payment in payments" :key="payment.id">
            <td colspan="2">{}</td>
            <td>- <span>-R$ {}</span></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details {
  overflow-y: auto;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0 4px;
  }

  th {
    font-size: 1.15rem;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-grey);
  }

  td {
    font-size: 1rem;
    padding: 4px 0;
    vertical-align: middle;
  }

  tr:first-of-type > td {
    padding-top: 16px;
  }

  tbody tr:last-of-type > td {
    padding: 8px 0 16px;
  }

  tfoot tr:first-of-type > td {
    padding-top: 16px;
    border-top: 1px solid var(--color-grey);
  }

  :is(th, td) {
    text-align: right;
  }

  :is(th, td):first-of-type {
    text-align: left;
  }

  &__container {
    padding: 0 18px;
  }

  &__button-update {
    @include center;

    appearance: none;
    background: transparent;
    border: 0 none;
    padding: 0;
    margin: 0 0 0 12px;

    &[disabled] {
      opacity: 0.6;
    }
  }

  &__theading-quantity,
  &__theading-price {
    min-width: 80px;
  }

  &__input-item select {
    width: 100%;
  }

  &__input-quantity {
    max-width: 96px;
  }

  &__id {
    margin: 0 0 16px;
    font-size: 12px;
  }
}
</style>
