<script setup>
import { ref, watchEffect } from "vue";
import IngredientTable from "./IngredientTable.vue";

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

function closeMenu() {
  emit("close");
}

const isShow = ref(false);

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
    v-show="isShow"
    class="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <IngredientTable
      :item="props.item"
      subject="save"
      @clickButton="closeMenu"
    />
  </div>
</template>
