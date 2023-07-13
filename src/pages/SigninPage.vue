<script setup>
import RegistrationForm from '@/components/RegistrationForm.vue';
import ROUTES from '@/constants/routes.js';
import PROVIDE from '@/constants/provides.js';
import {inject, ref} from 'vue';
import {usePostCardsStore} from '@/store/postcardsStore.js';

const pb = inject(PROVIDE.PB);
const isSuccess = ref(false);
const errors = ref([]);
const postCollection = pb.collection('posts');
const postsFromPocketBase = [];
pb.autoCancellation(false);
const postcardStore = usePostCardsStore();

const onLogin = (dto) => {
  errors.value = [];
  if (!dto.password || dto.password.length === 0 || !dto.username || dto.username === 0) {
    errors.value = ['Login and password are required'];
  }
  else {
    pb.collection('users').authWithPassword(
        dto.username,
        dto.password,
    ).then(() => {
      isSuccess.value = true;
    }).catch((error) =>  {
      const errorData = error.data;
      console.log('> SignUpPage - onRegister: error = ', {error, errorData});
      if (errorData) {

          errors.value.push(errorData.message);

      }
      else {
        errors.value.push(error.message);
      }
    });
  };
  

    postCollection.getList(1).then((result) => {
     console.log('>onLogin result', result);
     console.log('>onLogin result.items', result.items);
     postsFromPocketBase.value = result.items;
     if ( postsFromPocketBase.value != null) {
       postcardStore.createPostCards(postsFromPocketBase.value);
     }
     console.log('>onLogin postsFromPocketBase.value', postsFromPocketBase.value);
   });



};
</script>
<template>
<div class="flex-col">

  <div v-if="!isSuccess">
    <RegistrationForm
        :errors="errors"
        @login="onLogin" >
    </RegistrationForm>

  </div>

  <div v-else>
    <div>You have been successfully logged in. Creat postcards to add them to global gallery. Do not forget to think of a cation!</div>

  </div>
  <div class="pa-4 ma-4">
    <router-link :to="ROUTES.SIGNUP"
    v-if="!isSuccess">
      <v-btn>Sign Up </v-btn>
    </router-link>
  </div>

</div>
</template>