<script setup>
import {computed, onMounted} from 'vue';

const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: '-'
  }
});
defineEmits(['delete']);

const pathToEdit = computed(() => `/todos/${props.index}`);

onMounted(() => {
  console.log('> TodoItem -> onMounted: props.text =', props.text);
});
</script>
<template>
  <div>
    Проверка
    {{ index }})
    <router-link :to="pathToEdit">
      {{ text }}
    </router-link>
    <button @click="$emit('delete')">

    </button>
  </div>
</template>