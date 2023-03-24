<script setup>
import { onMounted, ref } from "vue";
import { createPopper } from "@popperjs/core";
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

const popcorn = ref(null);
const tooltip = ref(null);
const popperActive = { len: [0] };
Object.keys(categories).forEach((category, i) => {
  popperActive[category] = [];
  popperActive.len[i + 1] = categories[category].length + popperActive.len[i];
});

function plateOptions(category, i, e) {
  if (popperActive[category][i]) {
    popperActive[category][i].destroy();
    popperActive[category][i] = null;
  } else {
    popperActive[category][i] = createPopper(
      popcorn.value[i + popperActive.len[e]],
      tooltip.value[i + popperActive.len[e]],
      {
        placement: "right",
      }
    );
  }
}
</script>

<template>
  <nav class="h-screen w-full">
    <div v-for="(category, name, catNum) in categories" class="mb-4">
      <header class="mb-4 border-b border-gray-300 pb-1">
        <h2 class="font-bold">{{ name }}</h2>
      </header>
      <ul class="grid grid-cols-4 gap-2">
        <li v-for="(plate, plateNumber) in category">
          <div
            class="h-32 w-40 overflow-hidden rounded border bg-white text-black shadow"
            @click="plateOptions(name, plateNumber, catNum)"
            ref="popcorn"
          >
            <header
              class="h-8 border-b border-gray-300 py-1 px-2 text-base line-clamp-1"
            >
              {{ plate.title }}
            </header>
            <div>
              <img
                class="h-24 w-40 object-cover"
                :src="`./image/${plate.image}`"
                :alt="plate.title"
              />
            </div>
            <div id="tooltip" ref="tooltip">Hola</div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
