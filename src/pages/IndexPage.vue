
<script setup>
import AppGallery from '@/components/AppGallery.vue';
import {inject} from 'vue';
import PROVIDE from '@/constants/provides.js';

const pb = inject(PROVIDE.PB);
const postCollection = pb.collection('posts');

const getPostFromPB = async () => {
  const record = await postCollection.getOne('RECORD_ID', {
    expand: 'relField1,relField2.subRelField',
  });
};



</script>

<template>
  <div>
    INDEX PAGE
  </div>
<v-row class="ma-4" >
<AppGallery/>


</v-row>


</template>