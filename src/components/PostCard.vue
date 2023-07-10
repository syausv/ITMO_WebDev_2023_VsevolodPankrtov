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

        <v-card-text>
          {{ text }}
        </v-card-text>

        <v-card-subtitle>
          today at time
        </v-card-subtitle>

        <v-card-actions>
          <v-card-subtitle class="text-grey-lighten-1">
            post: {{ index }}
          </v-card-subtitle>

          <v-spacer></v-spacer>

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