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

const insertPost = async (post) => {
  await postCollection.create(post).then((record) => {
    console.log('record created',record);
  }).catch((e)=> console.log(e));
};

const LOCAL_KEY_INPUT_TEXT = 'input_text';
const inputText = ref(parseLocalStorage(LOCAL_KEY_INPUT_TEXT, ''));
const isLoading = ref(false);
const postcardStore = usePostCardsStore();

const { postcards, getPostCardsCount } = storeToRefs(postcardStore);


const getPostCardText = computed(() => inputText.value?.trim());

let picture;


const onSelectImage = (data) => {
  console.log('> PostCardsPage -> onSelectImage: data base64');
  picture = data;
};

const onSendClick = async () => {
  let postcardtext = getPostCardText.value;

  console.log('> PostCardsPage -> onSendClick:', postcardtext);

  postcardStore.createPostCard(postcardtext, picture);

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
};

const onDeletePostCard = (index) => {
  console.log('> TodosPage -> onDeletePostCard:', index);
  postcardStore.deletePostCardByIndex(index);
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
        <InputImage @picture="onSelectImage" />
        <div v-if="isLoading">
          File is loading, wait please...
        </div>
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
            :loading="loading"
            type="submit"
            block
            variant="outlined"
            class="mt-2 align-self-end"
            text="Post"
            shaped
            @click="onSendClick"
          />
          <div v-if="isLoading">
            File is loading, wait please...
          </div>
        </v-col>
      </v-row>
      <div>
        <span
          v-if="postcards.length"
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
            v-for="(item, index) in postcards"
            :key="item"
          >
            <PostCard
              :index="index + 1"
              :text="item[0]"
              :image="item[1]"
              @delete="onDeletePostCard(index)"
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

