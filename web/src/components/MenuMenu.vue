<script setup>
import { onMounted, ref } from "vue";
import { getData } from "../assets/js/database.js";
import allPlates from "../assets/json/plates.json";
import Plates from "../assets/helpers/plates.js";

let menu = ref(null);

getData("all", "plates", "title").then((data) => {
  menu.value = data;
});

const plates = new Plates();
plates.loadPlatesFromArray(allPlates);
const categories = plates.listByCategory();
</script>

<template>
  <nav class="h-screen w-full">
    <div v-for="(category, name) in categories">
      <h2>{{ name }}</h2>
      <ul class="grid grid-cols-4 gap-2">
        <li v-for="plate in category">
          <div
            class="h-32 overflow-hidden rounded border border-yellow-400 bg-yellow-100"
          >
            <header class="border-b border-yellow-400 py-1 px-2">
              {{ plate.title }}
            </header>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
