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
  },
  date: {
    type: Date,
    default:'today'
  }
});
defineEmits(['delete']);

const pathToEdit = computed(() => `/postcards/${props.index}`);
const Image = computed(() => `${props.image}`);
const date = computed(() => `${props.date}`);




onMounted(() => {
  console.log('> PostCard -> onMounted: props.text =', props.text);
  console.log('> PostCard -> onMounted: props.text =', props.date);

});



</script>
<template>

      <v-card
          class="mx-auto ma-4"
          max-width="344"
      >
        <v-img v-bind:src="Image"
               cover/>
        <v-card-text>
          {{ text }}
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="align-end">
          <v-card-subtitle class="text-grey-lighten-1
          flex-col w-40">
            <div class="text-start">posted:</div>
            <div> {{ (date).slice(0,19) }} </div>
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
          <v-btn @click="$emit('delete')"
                 class="text-grey-lighten-1">
            Delete
          </v-btn>
        </v-card-actions>

      </v-card>



</template>