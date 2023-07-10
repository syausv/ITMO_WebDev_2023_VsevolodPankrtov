<script setup>
import {computed, ref, watch} from 'vue';
import PostCard from '@/components/PostCard.vue';
import InputImage from '@/components/InputImage.vue';
import {parseLocalStorage, saveToLocalStorage} from '@/utils/storageUtils.js';
import {usePostCardsStore} from '@/store/postcardsStore.js';
import {storeToRefs} from 'pinia';

const LOCAL_KEY_INPUT_TEXT = 'input_text';

const inputText = ref(parseLocalStorage(LOCAL_KEY_INPUT_TEXT, ''));

const postcardStore = usePostCardsStore();

const { postcards, getPostCardsCount } = storeToRefs(postcardStore);


const getPostCardText = computed(() => inputText.value?.trim());

let picture;


const onSelectImage = (data) => {
  console.log('> PostCardsPage -> onSelectImage: data base64');
  picture = data;
};

const onSendClick = async () => {

  console.log('> PostCardsPage -> onSendClick:', getPostCardText.value);
  postcardStore.createPostCard(getPostCardText.value, picture);
  inputText.value = '';
};

const onDeletePostCard = (index) => {
  console.log('> TodosPage -> onDeletePostCard:', index);
  postcardStore.deletePostCardByIndex(index);
};

watch(inputText, (v) => saveToLocalStorage(LOCAL_KEY_INPUT_TEXT, v));



</script>
<template>
  <v-card
      class="mx-auto"
      width="800px"
  >
    <v-row class="pa-2 ma-2 mb-2" >
      <InputImage  @picture='onSelectImage'></InputImage>
    <v-col>
      <v-textarea
          v-model="inputText"
          ref="domInput"
          label="Your caption"
          auto-grow
          variant="outlined"
          rows="3"
          row-height="25"
          shaped

      ></v-textarea>
      <v-btn
          @click="onSendClick"
          :loading="loading"
          type="submit"
          block
          variant="outlined"
          class="mt-2 align-self-end"
          text="Post"
          shaped
      ></v-btn>
    </v-col>
      </v-row>
    <div>

      <span v-if="postcards.length"
            class="text-grey-lighten-1 text-s"> posts:
      {{ getPostCardsCount }}
    </span>
       <span v-else
             class="text-grey-lighten-1">there's no posts here</span>
      <template
          v-for="(item, index) in postcards"
          :key="item"
      >
        <PostCard
            :index="index + 1"
            :text="item[0]"
            :image = "item[1]"
            @delete="onDeletePostCard(index)"
        />
      </template>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ImageCaption'
};
</script>

