<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useStore } from "@nanostores/vue";
import { cartStore, editItemFromCart } from "../stores/products.js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const isShow = ref(props.show);

const name = ref(props.item.name);
const price = ref(props.item.specs.price);
const gramaje = ref(props.item.specs.gramaje);
const gj_total = ref(props.item.specs.gj_total);
const gj_porcion = ref(props.item.specs.gj_porcion);

const categories = reactive([
  {
    name: "🧂",
    value: "sal",
    active: false,
  },
  {
    name: "🍖",
    value: "carne",
    active: false,
  },
  {
    name: "🥗",
    value: "verdura",
    active: false,
  },
  {
    name: "☕",
    value: "cafe",
    active: false,
  },
  {
    name: "🍬",
    value: "dulce",
    active: false,
  },
]);

categories.forEach((category) => {
  if (category.value === props.item.category.value) {
    category.active = true;
  }
});

const oneActiveCategory = (value) => {
  categories.forEach((category, index) => {
    if (category.value === value) {
      console.log(category.value, value);
      categories[index].active = !category.active;
    } else {
      category.active = false;
    }
  });
};

function saveValues() {
  const product = {
    id: props.item.id,
    name: name.value,
    specs: {
      gj_total: gj_total.value,
      gj_porcion: gj_porcion.value,
      gramaje: gramaje.value,
      price: price.value,
      price_porcion: price.value / (gj_total.value / gj_porcion.value),
    },
    category: categories.filter((category) => category.active)[0],
  };
  editItemFromCart(cartStore, product.id, product);
  emit("close");
  console.log(product);
}

const show = watchEffect(() => {
  if (props.show) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
});
</script>

<template>
  <div
    v-if="isShow"
    class="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="price-calculator p-1">
      <div class="price-calculator__input">
        <label for="name">Nombre</label>
        <input type="text" id="name" placeholder="Nombre" v-model="name" />
      </div>
      <div class="price-calculator__input">
        <label for="price">Precio</label>
        <input type="number" id="price" v-model="price" />
      </div>
      <div class="price-calculator__input">
        <label for="gramaje">Gramaje</label>
        <select v-model="gramaje">
          <option value="gr">gr</option>
          <option value="ml">ml</option>
          <option value="ud">ud</option>
        </select>
      </div>
      <div class="price-calculator__input">
        <label for="gj_total">Gramaje Total</label>
        <input type="number" id="gj_total" v-model="gj_total" />
      </div>
      <div class="price-calculator__input">
        <label for="gj_porcion">Gramaje Porción</label>
        <input type="number" id="gj_porcion" v-model="gj_porcion" />
      </div>
      <div class="price-calculator__button">
        <label for="category" hidden>Categoria</label>
        <button
          v-for="category in categories"
          type="button"
          :value="category.name"
          :class="{ active: category.active }"
          :key="category.name"
          @click="oneActiveCategory(category.value)"
        >
          {{ category.name }}
        </button>
      </div>
      <div class="mt-2">
        <button
          class="h-full w-full rounded bg-lime-500 py-2 text-center text-white"
          type="submit"
          id="agregar"
          @click="saveValues"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  </div>
</template>
