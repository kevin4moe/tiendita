<script setup>
import { ref, computed } from "vue";
import { useStore } from "@nanostores/vue";
import { cartStore, addToCart } from "../stores/products.js";

const cart = useStore(cartStore);

const cost = computed(() =>
  cart.value.items.length
    ? cart.value.items.reduce((ac, newa) => ac + newa.specs.price_porcion, 0)
    : 0
);
const revenue = computed(() => cost.value * 0.3);
const platforms = ref(0.3);
const discount = ref(0);
const quantity = computed(() => cart.value.items.length);
const total = computed(() => {
  const i = (cost.value + revenue.value) / (1 - platforms.value);
  return i;
});
const tax = ref(0.08);
const total_tax = computed(() => {
  const i = (cost.value + revenue.value) / (1 - platforms.value - tax.value);
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
      <h3>Ganancia</h3>
      <div>
        {{ formatter.format(revenue) }}
      </div>
    </div>
    <div class="price-calculator__input">
      <h3>Plataformas</h3>
      <input type="number" id="platforms" v-model="platforms" />
    </div>
    <div class="price-calculator__input">
      <h3>Descuento</h3>
      <input type="number" id="discount" v-model="discount" />
    </div>
    <div class="price-calculator__input">
      <h3>Cantidad</h3>
      <div>{{ quantity }}</div>
    </div>
    <div class="price-calculator__input">
      <h3>Precio s/ IVA</h3>
      <div>{{ formatter.format(total) }}</div>
    </div>
    <div class="price-calculator__input">
      <h3>IVA</h3>
      <input type="number" id="tax" v-model="tax" />
    </div>
    <div class="price-calculator__input">
      <h3>Precio c/ IVA</h3>
      <div>{{ formatter.format(total_tax) }}</div>
    </div>
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
