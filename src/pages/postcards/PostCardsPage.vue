<script setup>
import {computed, inject, ref, watch} from 'vue';
import PostCard from '@/components/PostCard.vue';
import InputImage from '@/components/InputImage.vue';
import {parseLocalStorage, saveToLocalStorage} from '@/utils/storageUtils.js';
import {usePostCardsStore} from '@/store/postcardsStore.js';
import {storeToRefs} from 'pinia';
import PROVIDE from '@/constants/provides.js';


const pb = inject(PROVIDE.PB);
const postCollection = pb.collection('posts');
let posts = ref([]);
let loading = ref(true);
const postcardStore = usePostCardsStore();
let idFromPocketBase;

const subscribePB = () => {

  postCollection.subscribe('*', function (e) {
    console.log(e.record);
    idFromPocketBase = e.record.id;
    console.log('idFromPocketBase',idFromPocketBase);
  });
};
subscribePB();


/*const getListOFCardsPB = () => {

    postCollection.getList(1).then((result) => {
      // console.log('> result', result);
      console.log('> result.items', result.items);
      posts.value = result.items;
      loading.value = false;
      // console.log('> posts.value', posts.value);
    });
};*/

/*getListOFCardsPB();*/




const LOCAL_KEY_INPUT_TEXT = 'input_text';
const inputText = ref(parseLocalStorage(LOCAL_KEY_INPUT_TEXT, ''));

posts.value = postcardStore.getListOFCardsLocal();
console.log('> PostCardsPage -> posts.value:', posts.value);
/*const getListOFCardsLocal = () => {

  const result = localStorage.getItem('postcardsFromPocketBase') ? JSON.parse(localStorage.getItem('postcardsFromPocketBase')) : [];
  posts.value = result;
  posts.value = posts.value.postcards;
  console.log('posts.value ', posts.value);

};*/

//getListOFCardsLocal();
//const postcardStore = usePostCardsStore();

//const { postcards, getPostCardsCount } = storeToRefs(postcardStore);

const getPostCardText = computed(() => inputText.value?.trim());

let picture;


const insertPost = async (post) => {
  await postCollection.create(post).then((record) => {
    console.log('record created',record);
  }).catch((e)=> console.log(e));
};

const onSelectImage = (data) => {
  console.log('> PostCardsPage -> onSelectImage: data base64');
  picture = data;
};

const onSendClick = async () => {
  let postcardtext = getPostCardText.value;
  console.log('> PostCardsPage -> onSendClick: {postcardtext,picture}', {postcardtext,picture});
  //postcardStore.createPostCard(postcardtext, picture);

  const postForBase = {
    'title': postcardtext,
    'base64_string': picture
  };
  console.log('> PostCardsPage -> onSendClick:', postForBase);

  try {
    await insertPost(postForBase);
  } catch (e) {
    console.log(e);
  }

  inputText.value = '';

  setTimeout(function() {
    const idLocal = idFromPocketBase;
    console.log('> SET TIMEOUT');
    const postForLocal = {
      id: idLocal,
      title : postcardtext,
      base64_string : picture,
      created: 'recently'
    };
    postcardStore.createPostCard(postForLocal);
  }, 2000);
  posts.value = postcardStore.getListOFCardsLocal();
};

const onDeletePostCard = async (id, index) => {
  console.log('> TodosPage -> onDeletePostCard:',id);
  console.log('> TodosPage -> onDeletePostCard:',index);
  postcardStore.deletePostCardByIndex(index);
  postCollection.delete(id);
  posts.value = postcardStore.getListOFCardsLocal();
};

watch(inputText, (v) => saveToLocalStorage(LOCAL_KEY_INPUT_TEXT, v));
//watch(posts);

loading.value = false;

</script>
<template>
  <div class="flex-row font-weight-bold text-grey-darken-1 text-start mb-4">
    POST CARDS
  </div>
  <v-row class="mt-6">
    <v-card
      class="mx-auto"
      max-width="1000px"
    >
      <v-row class="pa-2 ma-2 mb-2">
        <InputImage @picture="onSelectImage"/>
        <v-col>
          <v-textarea
            ref="domInput"
            v-model="inputText"
            label="Your caption"
            auto-grow
            variant="outlined"
            rows="3"
            row-height="25"
            shaped
          />
          <v-btn
            type="submit"
            block
            variant="outlined"
            class="mt-2 align-self-end"
            text="Post"
            shaped
            @click="onSendClick"
          />
        </v-col>
      </v-row>
      <div>
        <v-text-field v-if="loading"
            color="success"
                      loading
                      disabled>
posts are loading...
        </v-text-field>

        <v-row class="ma-2">
          <template
              v-for="(post, index) in posts"
              :key="post"

          >
            <v-col class="h-auto"
                 >
            <PostCard
              :index="index + 1"
              :id="post.id"
              :text="post.title"
              :image="post.base64_string"
              :date="post.updated"
              @delete="onDeletePostCard(post.id,index)"

            />
              {{post.id}}
            </v-col>
          </template>
        </v-row>
      </div>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'ImageCaption'
};
</script>

