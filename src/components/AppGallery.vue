<script setup>
import {inject, ref} from 'vue';
import PROVIDE from '@/constants/provides.js';

const pb = inject(PROVIDE.PB);
const postCollection = pb.collection('posts');
const posts = ref([]);
pb.autoCancellation(false);

postCollection.subscribe('*', function (e) {
  console.log(e.record);
});

postCollection.subscribe('RECORD_ID', function (e) {
  console.log(e.record);
});

 postCollection.getList(1).then((result) => {
  // console.log('> result', result);
   console.log('> result.items', result.items);
   posts.value = result.items;
  // console.log('> posts.value', posts.value);
 });

</script>


<template>
  <v-card
      class="mx-auto ma-2"
      max-width="1200"
  >
    <v-container fluid>
      <v-row dense>
        <v-col v-for="post in posts"
               :key="post.title"
               :cols="post.flex">
          <v-card>
            <v-img
                :src="post.base64_string"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                min-width="150px"
                cover
            >
              <v-card-title
                  :text="post.title"
                  class="text-white"
              ></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-heart"
              ></v-btn>

              <v-btn
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-bookmark"
              ></v-btn>

              <v-btn
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-share-variant"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>



<style scoped>

</style>