import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { v4 as uuid } from "uuid";

const emptyOrder = {
  tableId: null,
  bookingStartTime: null,
  bookingEndTime: null,
  serviceHasStarted: false,
  personName: null,
  personContact: null,
  bill: [],
  payments: [],
  status: "active",
};

const ordersStore = defineStore("orders", () => {
  const _orders = ref([]);

  const _findOrderInd = (orderId) =>
    _orders.value.findIndex(({ id }) => id === orderId);

  const orders = computed(() =>
    _orders.value.filter(({ status }) => status === "active")
  );

  function bookTableForOrder(orderInformation) {
    const id = uuid();
    const order = { ...emptyOrder, ...orderInformation, id };
    _orders.value.push(order);

    return id;
  }

  function clearTableOrder(id) {
    const ind = _findOrderInd(id);
    _orders.value[ind].status = "cancelled";
  }

  function startTableOrder({ id, ...orderInformation }) {
    let orderId = id;

    if (orderId) {
      const ind = _findOrderInd(orderId);

      _orders.value[ind] = {
        ..._orders.value[ind],
        ...orderInformation,
        serviceHasStarted: true,
      };
    } else {
      orderId = uuid();
      _orders.value.push({
        ...emptyOrder,
        ...orderInformation,
        serviceHasStarted: true,
        id: orderId,
      });
    }
    return orderId;
  }

  return {
    _orders,
    orders,
    bookTableForOrder,
    clearTableOrder,
    startTableOrder,
  };
});

export const useOrdersStore = () => storeToRefs(ordersStore());
export const useOrdersActions = () => ordersStore();
