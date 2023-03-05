<script setup>
import { ref, computed } from "vue";

const price = ref(0);
const platforms = computed(() => price.value * 0.3);
const tax = computed(() => price.value * 0.08);
const discount = ref(0);
const quantity = ref(0);
const total = computed(() => {
  const i =
    price.value + platforms.value + tax.value - discount.value * quantity.value;
  return formatter.format(i);
});

const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});
</script>

<template>
  <div class="price-calculator">
    <div class="price-calculator__input">
      <label for="price">Price</label>
      <input type="number" id="price" v-model="price" />
    </div>
    <div class="price-calculator__input">
      <label for="platforms">Plataformas</label>
      <input
        disabled
        type="number"
        id="platforms"
        :placeholder="formatter.format(platforms)"
      />
    </div>
    <div class="price-calculator__input">
      <label for="tax">Tax</label>
      <input
        disabled
        type="number"
        id="tax"
        :placeholder="formatter.format(tax)"
      />
    </div>
    <div class="price-calculator__input">
      <label for="discount">Discount</label>
      <input type="number" id="discount" v-model="discount" />
    </div>
    <div class="price-calculator__input">
      <label for="quantity">Quantity</label>
      <input type="number" id="quantity" v-model="quantity" />
    </div>
    <div class="price-calculator__input">
      <label for="total">Total</label>
      <input disabled type="text" id="total" v-model="total" />
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
.price-calculator__input label {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
}
.price-calculator__input input {
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
