<script setup>
import { ref } from "vue";
import { useStore } from "@nanostores/vue";
import { cartStore, addToCart, removeFromCart } from "../stores/products.js";
import {
  storeRecipes,
  localRecipes,
  addToCart as addToRecipes,
} from "../stores/recipes.js";
import EditItem from "./EditItem.vue";

const cart = useStore(cartStore);

const show = ref(false);

function deleteItem(id) {
  removeFromCart(cartStore, id);
}

function confirmDeleteAction(id) {
  if (window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
    deleteItem(id);
  } else {
    console.log(`No se eliminó el elemento con id: ${id}`);
  }
}

function checkItem() {
  show.value = !show.value;
}

function saveRecipe() {
  const ids = cart.value.items.map((item) => item.id);
  console.log(ids);
  addToRecipes(storeRecipes, ids, localRecipes);
}
</script>

<template>
  <div class="ingredientslist">
    <header
      class="ingredientslist-header rounded-t bg-lime-500 px-10 py-1 text-center text-white"
    >
      <h2 class="text-lg font-semibold">Productos</h2>
    </header>
    <ul class="ingredientslist-ul">
      <li v-for="item in cart.items" class="tooltip" :key="item.name">
        <div class="content">
          {{ item.category.name }}{{ item.name }}
          <span class="tooltiptext">
            {{ item.category.name }}
            {{
              `$${item.specs.price_porcion} (${item.specs.gj_porcion} ${item.specs.gramaje})`
            }}
          </span>
        </div>
        <div>
          <button
            class="mr-1 text-xs font-light"
            type="button"
            @click="checkItem"
          >
            Check
          </button>
          <EditItem :item="item" :show="show" @close="checkItem" />
          <button
            class="text-xs font-light"
            type="button"
            @click="confirmDeleteAction(item.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
    <footer
      class="ingredientslist-footer rounded-b bg-lime-500 px-10 py-1 text-center text-white"
    >
      <button class="text-xs font-light" type="button" @click="saveRecipe">
        Guardar receta
      </button>
    </footer>
  </div>
</template>

<style>
.ingredientslist {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}
.ingredientslist-ul {
  display: flex;
  flex-direction: column;
}
.ingredientslist-ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  widows: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0.5rem;
}

.content {
  position: relative;
}

.tooltiptext {
  visibility: hidden;
  width: 8rem;
  background-color: black;
  color: white;
  font-size: small;
  text-align: center;
  padding: 0.5rem 0;
  position: absolute;
  border-radius: 6px;
  z-index: 1;
  top: 100%;
  left: -20%;
  opacity: 0;
  transition: opacity 0.3s;
}

.content:hover .tooltiptext {
  visibility: visible;
  opacity: 0.9;
}

.tooltip .content {
  cursor: pointer;
}
</style>
