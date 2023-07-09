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

});



</script>
<template>
  <div>
      <v-card
          class="mx-auto"
          max-width="344"
      >
        <v-img v-bind:src="Image"
               cover/>

        <v-card-title>
          {{ index }})
          {{ text }}
        </v-card-title>

        <v-card-subtitle>
          1,000 miles of wonder
        </v-card-subtitle>

        <v-card-actions>
          <router-link :to="pathToEdit">
          <v-btn
              color="orange-lighten-2"
              variant="text"
          >
            Edit
          </v-btn>
          </router-link>
        </v-card-actions>

      </v-card>

    <button @click="$emit('delete')">

    </button>
  </div>
</template>