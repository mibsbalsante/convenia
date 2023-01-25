<script setup>
import { ref, computed } from "vue";

import { accepted_payments as paymentsJSON } from "@/utils/payments";
import { useOrdersActions } from "@/stores/orders";
import { useMenuStore, useMenuActions } from "@/stores/menu";
import IconCircleMinus from "@fa/solid/circle-minus.svg";
import IconCirclePlus from "@fa/solid/circle-plus.svg";

const TIPPING_TAX = 0.1;

const props = defineProps({
  orderId: String,
  bill: Array,
  payments: Array,
});

const { addToOrder, removeFromOrder } = useOrdersActions();
const { availableMenu } = useMenuStore();
const { removeQuantityFromMenu, addQuantityBackToMenu } = useMenuActions();

// ---- bill management ----
const currentInd = ref(0);
const quantity = ref(1);

const currentItem = computed(() => availableMenu.value[currentInd.value] || {});
const totalBill = computed(() =>
  props.bill.reduce(
    (total, { price, quantity }) => (total += price * quantity),
    0
  )
);
const totalTip = computed(() => totalBill.value * TIPPING_TAX);

const handleAddToBill = () => {
  addToOrder(props.orderId, "bill", {
    ...currentItem.value,
    quantity: quantity.value,
  });
  removeQuantityFromMenu(currentItem.value.id, quantity.value);

  quantity.value = 1;
};

const handleRemoveFromBill = (ind) => {
  addQuantityBackToMenu(props.bill[ind].id, props.bill[ind].quantity);
  removeFromOrder(props.orderId, "bill", ind);
};

// ---- payment management ----
const paymentTypeId = ref(0);
const paymentValue = ref(null);
const paymentDescription = ref(null);
const paymentValueRemaining = computed(() =>
  props.payments.reduce(
    (total, { value }) => (total -= value),
    totalBill.value + totalTip.value
  )
);

const handleAddToPayments = () => {
  addToOrder(props.orderId, "payments", {
    ...paymentsJSON[paymentTypeId.value],
    value: paymentValue.value,
    description: paymentDescription.value,
  });
  quantity.value = 1;
};

const handleRemoveFromPayments = (ind) => {
  removeFromOrder(props.orderId, "payments", ind);
};
</script>

<template>
  <div class="details">
    <div class="details__container">
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
            <td>R$ {{ totalTip.toFixed(2) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">Total:</td>
            <td>R$ {{ (totalBill + totalTip).toFixed(2) }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <table v-if="bill?.length > 0">
        <thead>
          <tr>
            <th>Pagamento</th>
            <th class="details__theading-price">Valor</th>
            <th class="details__theading-description">Nota</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id">
            <td>{{ payment.name }}</td>
            <td>
              <span>-R$ {{ payment.value.toFixed(2) }}</span>
            </td>
            <td>
              <span>{{ payment.description }}</span>
            </td>
            <td>
              <button
                @click="handleRemoveFromPayments(ind)"
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
                :value="paymentTypeId"
                @change="paymentTypeId = Number($event.target.value)"
              >
                <option
                  v-for="(payment, ind) in paymentsJSON"
                  :value="ind"
                  :key="payment.id"
                >
                  {{ payment.name }}
                </option>
              </select>
            </td>
            <td>
              <input
                type="text"
                :value="paymentValue"
                @change="paymentValue = Number($event.target.value)"
              />
            </td>
            <td>
              <input
                type="text"
                :value="paymentDescription"
                @change="paymentDescription = $event.target.value"
              />
            </td>
            <td>
              <button
                @click="handleAddToPayments"
                class="details__button-update"
                :disabled="!paymentValue"
              >
                <IconCirclePlus />
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Valor restante:</strong></td>
            <td>R$ {{ paymentValueRemaining.toFixed(2) }}</td>
            <td></td>
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

    + table {
      margin-top: 24px;
    }
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
    padding-top: 4px;
    padding-bottom: 4px;
    vertical-align: middle;
  }

  th:nth-of-type(4) {
    width: 24px;
  }

  tr:first-of-type > td {
    padding-top: 16px;
  }

  tbody tr:last-of-type > td {
    padding-top: 8px;
    padding-bottom: 16px;
  }

  tfoot tr:first-of-type > td {
    padding-top: 16px;
    border-top: 1px solid var(--color-grey);
  }

  input[type="text"] {
    max-width: 120px;
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

  &__theading-description {
    min-width: 120px;
  }

  &__input-item select {
    width: 100%;
  }

  &__input-quantity {
    max-width: 96px;
  }
}
</style>
