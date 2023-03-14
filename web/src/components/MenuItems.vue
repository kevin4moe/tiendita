<script setup>
import { reactive } from "vue";
import { useStore } from "@nanostores/vue";
import Card from "./Card.vue";
import { cartStore } from "../stores/products.js";

const cart = useStore(cartStore);

const categories = [
  {
    name: "Ingredientes",
    value: "ingredientes",
  },
  {
    name: "Recetas",
    value: "recetas",
  },
];

const menuBar = reactive({
  main: true,
  category: "",
});

function changeMenuBar(category) {
  if (menuBar.category !== category) {
    menuBar.main = !menuBar.main;
    menuBar.category = category;
  }
}
</script>

<template>
  <aside class="fixed inset-y-0 left-0 h-screen w-52 bg-yellow-400/40">
    <div class="h-full py-12">
      <p
        class="text-center italic"
        :class="{ 'cursor-pointer': !menuBar.main }"
        @click="changeMenuBar('')"
      >
        {{
          menuBar.main
            ? "Selecciona una categoria"
            : `/principal/${menuBar.category}`
        }}
      </p>
      <ul v-show="menuBar.main" class="flex h-full flex-col">
        <li v-for="category in categories" :key="category.value">
          <Card
            :message="category.name"
            @clickButton="changeMenuBar(category.value)"
          />
        </li>
      </ul>
      <ul
        v-if="menuBar.category === 'ingredientes'"
        class="flex h-full flex-col"
      >
        <li v-for="item in cart.items" :key="item.id">
          <Card
            :message="`${item.category.name} ${item.name} $${item.specs.price}`"
          />
        </li>
      </ul>
    </div>
  </aside>
</template>
