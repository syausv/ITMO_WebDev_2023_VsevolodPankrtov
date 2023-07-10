<script setup>
import RegistrationForm from '@/components/RegistrationForm.vue';
import ROUTES from '@/constants/routes.js';
import PROVIDE from '@/constants/provides.js';
import {inject, ref} from 'vue';


const pb = inject(PROVIDE.PB);
const isSuccess = ref(false);
const errors = ref([]);

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
  }

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
    <div>You have been successfully logged in</div>
    <router-link :to="ROUTES.INDEX">
      Home
    </router-link>
  </div>
  <div class="pa-4 ma-4">
    <router-link :to="ROUTES.SIGNUP">
      <v-btn>Sign Up </v-btn>
    </router-link>
  </div>

</div>
</template>