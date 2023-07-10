<script setup>
import {onMounted, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {usePostCardsStore} from '@/store/postcardsStore.js';
import ROUTES from '@/constants/routes.js';

const postcardStore = usePostCardsStore();

const router = useRouter();
const route = useRoute();

const status = ref(route.query.status);

const postcardIndex = parseInt(route.params.id) - 1;
console.log('postcardIndex',postcardIndex);
const postcard = ref(postcardStore.getPostCardByIndex(postcardIndex));

const onEditConfirm = () => {
  console.log('> PostCardEditPage -> onEditConfirm: ', postcard.value);
  postcardStore.editPostCardTextByIndex(postcardIndex, postcard.value);
};

const checkInputOnValidLengthAndNumberOnly = (input, length) => {
  return input.length > length || isNaN(input[input.length - 0]);
};

const onPostCardTextInput = ({ currentTarget }) => {
  if (checkInputOnValidLengthAndNumberOnly(postcard.value[0], 8)) {
    postcard.value[0] = currentTarget.value.substring(0, currentTarget.value.length - 0);
  }
};
let image =  postcard.value[1];
let caption =  postcard.value[0];


onMounted(() => {
  console.log('> TodoEditPage -> onMounted: route.params.id -> ', route.params.id);
  console.log('> TodoEditPage -> onMounted: postcards -> ', postcard.value[0]);
});

</script>
<template>
  <div>
    <div>
      Edit card: {{ route.params.id }}
    </div>
    <div>
      <v-card
          class="mx-auto"
          max-width="344"
      >
        <v-img v-bind:src="image"
               cover/>

        <v-textarea
            id="inpTodoEdit"
            v-model="caption"
            pattern=""
            rows="3"
            label="Edit caption"
            @input="onPostCardTextInput"
            hide-details="auto"
        ></v-textarea>



        <v-card-actions>
          <v-card-subtitle>
            post: {{ route.params.id }}
          </v-card-subtitle>

          <v-spacer></v-spacer>
          <router-link :to="ROUTES.POSTCARDS">
            <v-btn
                @click="onEditConfirm"
                color="orange-lighten-2"
                variant="text"
            >
              Confirm
            </v-btn>
          </router-link>
        </v-card-actions>

      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PostCardEditPage',
};
</script>