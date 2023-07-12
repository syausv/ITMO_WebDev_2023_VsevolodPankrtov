<script setup>
import {inject, onMounted, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {usePostCardsStore} from '@/store/postcardsStore.js';
import ROUTES from '@/constants/routes.js';
import PROVIDE from '@/constants/provides.js';

const pb = inject(PROVIDE.PB);
const postCollection = pb.collection('posts');
const posts = ref([]);
pb.autoCancellation(false);
const postcardStore = usePostCardsStore();

const router = useRouter();
const route = useRoute();


  console.log('>getCardFromPB route.params.id', route.params.id);
  postCollection.getOne(route.params.id).then((result) => {
     console.log('> result', result);

     console.log('> result.items', result);
    posts.value = result;
    // console.log('> posts.value', posts.value);
  }).catch((e)=>{console.log(e);});



console.log('> posts.value', posts.value);
console.log('> route.params.id', route.params.id);
// const postcardIndex = parseInt(route.params.id) - 1;
// console.log('postcardIndex',postcardIndex);
// const postcard = ref(postcardStore.getPostCardByIndex(postcardIndex));


const onEditConfirm = () => {
 // console.log('> PostCardEditPage -> onEditConfirm: ', postcard.value);
 // postcardStore.editPostCardTextByIndex(postcardIndex, postcard.value);
  const data = {
    'title': posts.value.title ,
  };
  postCollection.update( route.params.id, data);
};

const checkInputOnValidLengthAndNumberOnly = (input, length) => {
  return input.length > length || isNaN(input[input.length - 0]);
};

const onPostCardTextInput = ({ currentTarget }) => {
  if (checkInputOnValidLengthAndNumberOnly(posts.value.title, 8)) {
    posts.value.title = currentTarget.value.substring(0, currentTarget.value.length - 0);
  }
};

// let image =  postcard.value[1];
// let caption =  postcard.value[0];


onMounted(() => {
   console.log('> EditPage -> onMounted: route.params.id -> ', route.params.id);
   //console.log('> EditPage -> onMounted: postcards -> ', post.title);
});

</script>
<template>
  <div>
    <div>

    </div>
    <div>
      <v-card
          class="mx-auto"
          max-width="344"

      >
        <v-img v-bind:src="posts.base64_string"
               cover/>

        <v-textarea
            v-model="posts.title"
            pattern=""
            rows="3"
            label="Edit caption"
            @input="onPostCardTextInput"
            hide-details="auto"
        ></v-textarea>

        <v-card-actions>


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