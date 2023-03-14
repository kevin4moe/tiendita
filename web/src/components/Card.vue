<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["clickButton"]);
</script>

<template>
  <div
    class="m-2 cursor-pointer rounded border border-amber-500 bg-white p-1 text-center"
    @click="emit('clickButton')"
  >
    {{ props.message }}
  </div>
</template>
