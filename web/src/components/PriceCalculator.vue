<script setup>
import { ref, computed } from "vue";
import { useStore } from "@nanostores/vue";
import { cartStore, addToCart } from "../stores/products.js";
import SendData from "./SendData.vue";

const cart = useStore(cartStore);

const cost = computed(() =>
  cart.value.items.length
    ? cart.value.items.reduce((ac, newa) => ac + newa.specs.price_porcion, 0)
    : 0
);
const revenuePercent = ref(100);
const revenue = computed(() => cost.value * (revenuePercent.value / 100));
const quantity = computed(() => cart.value.items.length);
const platforms = ref(30);
const total = computed(() => {
  const i = (cost.value + revenue.value) / (1 - (platforms.value * 1.16) / 100);
  return i;
});
const tax = ref(8);
const total_tax = computed(() => {
  const i =
    (cost.value + revenue.value) /
    ((100 - platforms.value * 1.16 - tax.value) / 100);
  return i;
});

const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});
</script>

<template>
  <div class="price-calculator">
    <div class="price-calculator__input">
      <h3>Costo</h3>
      <div>{{ formatter.format(cost) }}</div>
    </div>
    <div class="price-calculator__input">
      <h3>Ganancia ({{ revenuePercent }}%)</h3>
      <input type="number" id="revenue-percent" v-model="revenuePercent" />
    </div>
    <div class="price-calculator__input">
      <h3>Ganancia</h3>
      <div>
        {{ formatter.format(revenue) }}
      </div>
    </div>
    <div class="price-calculator__input">
      <h3>Plataformas ({{ platforms }}%)</h3>
      <input type="number" id="platforms" v-model="platforms" />
    </div>
    <div class="price-calculator__input">
      <h3>Precio s/ IVA</h3>
      <div>{{ formatter.format(total) }}</div>
    </div>
    <div class="price-calculator__input">
      <h3>IVA ({{ tax }}%)</h3>
      <input type="number" id="tax" v-model="tax" />
    </div>
    <div class="price-calculator__input">
      <h3>Precio c/ IVA</h3>
      <div>{{ formatter.format(total_tax) }}</div>
    </div>
    <SendData :data="{ cost: cost, revenue: revenue, quantity: quantity }" />
  </div>
</template>

<style>
.price-calculator {
  display: flex;
  flex-direction: column;
}
.price-calculator__input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.price-calculator__input h3 {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
}
.price-calculator__input input,
.price-calculator__input div {
  padding: 0.5rem;
  border-left: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 6rem;
}
input[disabled] {
  --input-border: #ccc;

  background-color: #efefef;
  cursor: not-allowed;
}
input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
