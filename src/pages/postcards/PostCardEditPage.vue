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

const result = localStorage.getItem('postcardsFromPocketBase')? JSON.parse(localStorage.getItem('postcardsFromPocketBase')) : [];
posts.value = result;
posts.value = posts.value.postcards;
const idOfPost =  route.params.id;
const onePost =ref([]);

onePost.value = posts.value.find(function (item) {
  return item.id === idOfPost;
});

const subscribePB = () => {

  postCollection.subscribe('*', function (e) {
    console.log(e.record);
  });
};
subscribePB();



//onePost.value = posts[idOfPost];
  console.log('>getCardFromPB route.params.id', route.params.id);
  console.log('>getCardFromPB idOfPost', idOfPost);
  console.log('>>>>>>>>>> onePost', onePost);
 // console.log('>>>>>>>>>> posts[idOfPost]', posts[idOfPost]);
/*  postCollection.getOne(route.params.id).then((result) => {
     console.log('> result', result);

     console.log('> result.items', result);
    posts.value = result;
    // console.log('> posts.value', posts.value);
  }).catch((e)=>{console.log(e);});*/



console.log('> post.value', posts.value);
console.log('> route.params.id', route.params.id);
// const postcardIndex = parseInt(route.params.id) - 1;
// console.log('postcardIndex',postcardIndex);
// const postcard = ref(postcardStore.getPostCardByIndex(postcardIndex));


const onEditConfirm = () => {
  console.log('> PostCardEditPage -> onEditConfirm: postcard.value', posts.value);
  console.log('> PostCardEditPage -> onEditConfirm: onePost.value.title', onePost.value.title);
  const title =  onePost.value.title;
 // postcardStore.editPostCardTextByIndex(idOfPost, title);

 /* posts.value.find(function (item) {
        if (item.id === idOfPost) {
          console.log('item',item);
          console.log('item.title',item.title);
      item.title = title;
        }

  });*/

  

  const newPosts = posts.value.map((post) => (
      post.id === idOfPost
          ? { ...post, title: title }
          : post
  ));
  postcardStore.createPostCards(newPosts);
  console.log('newPosts',newPosts);


  const data = {
    'title': title ,
  };
  postCollection.update( idOfPost, data);

};

/*const checkInputOnValidLengthAndNumberOnly = (input, length) => {
  return input.length > length || isNaN(input[input.length - 0]);
};*/

/*
const onPostCardTextInput = ({ currentTarget }) => {
  if (checkInputOnValidLengthAndNumberOnly(posts.value.title, 8)) {
    posts.value.title = currentTarget.value.substring(0, currentTarget.value.length - 0);
  }
};
*/

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
        <v-img v-bind:src="onePost.base64_string"
               cover/>

        <v-textarea
            v-model="onePost.title"
            pattern=""
            rows="3"
            label="Edit caption"
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