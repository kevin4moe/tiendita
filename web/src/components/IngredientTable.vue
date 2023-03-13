<script setup>
import { ref, reactive } from "vue";
import { useStore } from "@nanostores/vue";
import { v4 as uuidv4 } from "uuid";
import { cartStore, addToCart, editItemFromCart } from "../stores/products.js";

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

const cart = useStore(cartStore);

const props = defineProps({
  item: {
    type: Object,
    required: false,
  },
  subject: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["clickButton"]);

const subject = props.subject === "add" ? "Agregar" : "Guardar cambios";

const name = ref("");
const price = ref(null);
const gramaje = ref("");
const gj_total = ref(null);
const gj_porcion = ref(null);

if (props.item) {
  name.value = props.item.name;
  price.value = props.item.specs.price;
  gramaje.value = props.item.specs.gramaje;
  gj_total.value = props.item.specs.gj_total;
  gj_porcion.value = props.item.specs.gj_porcion;

  categories.forEach((category) => {
    if (category.value === props.item.category.value) {
      category.active = true;
    }
  });
}

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

function addObject() {
  const product = {
    id: uuidv4(),
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
  addToCart(cartStore, product);
}

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
}

function selectMethod() {
  console.log(props.subject);
  if (props.subject === "add") {
    addObject();
  } else {
    saveValues();
  }

  emit("clickButton");
}
</script>

<template>
  <div class="price-calculator">
    <div class="price-calculator__input">
      <label for="name">Nombre</label>
      <input type="text" id="name" placeholder="Nombre" v-model="name" />
    </div>
    <div class="price-calculator__input">
      <label for="price">Precio</label>
      <input type="number" id="price" placeholder="Precio" v-model="price" />
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
      <input
        type="number"
        id="gj_total"
        placeholder="1000"
        v-model="gj_total"
      />
    </div>
    <div class="price-calculator__input">
      <label for="gj_porcion">Gramaje Porción</label>
      <input
        type="number"
        id="gj_porcion"
        placeholder="150"
        v-model="gj_porcion"
      />
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
        @click="selectMethod"
      >
        {{ subject }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.price-calculator {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.25rem;
}
.price-calculator__input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.price-calculator__input label {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
}
.price-calculator__input input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 6rem;
}
.price-calculator__input select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 6rem;
}
.price-calculator__button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.price-calculator__button button {
  padding: 0rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: 600;
}
.price-calculator__button button:hover {
  background-color: #d3e4ca;
}
.price-calculator__button button:active {
  background-color: #b5e69b;
}
.price-calculator__button button.active {
  background-color: #b5e69b;
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
