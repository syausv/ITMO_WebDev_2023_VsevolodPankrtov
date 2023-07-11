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
const posts = ref([]);
let loading = ref(true);

const subscribePB = () => {

  postCollection.subscribe('*', function (e) {
    console.log(e.record);
  });
};
subscribePB();

const getListOFCardsPB = () => {

    postCollection.getList(1).then((result) => {
      // console.log('> result', result);
      console.log('> result.items', result.items);
      posts.value = result.items;
      loading.value = false;
      // console.log('> posts.value', posts.value);
    });
};

getListOFCardsPB();


const insertPost = async (post) => {
  await postCollection.create(post).then((record) => {
    console.log('record created',record);
  }).catch((e)=> console.log(e));
};

const LOCAL_KEY_INPUT_TEXT = 'input_text';
const inputText = ref(parseLocalStorage(LOCAL_KEY_INPUT_TEXT, ''));
//const postcardStore = usePostCardsStore();

//const { postcards, getPostCardsCount } = storeToRefs(postcardStore);

const getPostCardText = computed(() => inputText.value?.trim());

let picture;
const onSelectImage = (data) => {
  console.log('> PostCardsPage -> onSelectImage: data base64');
  picture = data;
};

const onSendClick = async () => {
  let postcardtext = getPostCardText.value;
  console.log('> PostCardsPage -> onSendClick:', postcardtext);
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

  getListOFCardsPB();
};

const onDeletePostCard = async (index) => {
  console.log('> TodosPage -> onDeletePostCard:',index);
 // postcardStore.deletePostCardByIndex(index);
  await postCollection.delete(index);
  getListOFCardsPB();
};

watch(inputText, (v) => saveToLocalStorage(LOCAL_KEY_INPUT_TEXT, v));


</script>
<template>
  <v-row>
    <v-card
      class="mx-auto"
      width="1000px"
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
        <span
          v-if="posts.length"
          class="text-grey-lighten-1 text-s"
        > posts:
          {{ getPostCardsCount }}
        </span>
        <span
          v-else
          class="text-grey-lighten-1"
        >there's no posts here</span>
        <v-row class="ma-2">
          <template
              v-for="post in posts"
              :key="post.title"
          >
            <PostCard
              :index="post.id"
              :text="post.title"
              :image="post.base64_string"
              @delete="onDeletePostCard(post.id)"

            />
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

