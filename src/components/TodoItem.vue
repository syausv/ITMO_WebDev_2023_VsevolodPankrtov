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
  },
  image: {
    type: String,
    default: '-'
  }
});
defineEmits(['delete']);

const pathToEdit = computed(() => `/todos/${props.index}`);
const Image = computed(() => `${props.image}`);




onMounted(() => {
  console.log('> TodoItem -> onMounted: props.text =', props.text);
  console.log('> TodoItem -> onMounted: props.image =', props.image);

});



</script>
<template>
  <div>
    Проверка
    {{ index }})
    <router-link :to="pathToEdit">
      {{ text }}
      <div id="postImage"><img v-bind:src="Image" /></div>
    </router-link>

    <button @click="$emit('delete')">

    </button>
  </div>
</template>