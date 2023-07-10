<script setup>
import { ref } from 'vue';

const props = defineProps({
  registration: { type: Boolean, default: false },
  errors: { type: Array, default: () => [] },
});

const emit = defineEmits(['login', 'register']);

const inputUsername = ref(null);
const inputName = ref(null);
const inputEmail = ref(null);
const inputPassword = ref(null);
const inputConfirm = ref(null);

const checkPasswordsMatch = () => inputPassword.value.value === inputConfirm.value?.value;

const onSendClick = async () => {
  let dto;
  const username = inputUsername.value.value || '';
  const password = inputPassword.value.value || '';
  const email = inputEmail.value ? inputEmail.value.value : '';
  console.log('email',email);
    const name = inputName.value ? inputName.value.value : '';
  console.log('name',name);
    dto = {name, username, email, password};

  const canRegister = props.registration && checkPasswordsMatch();
  console.log('> RegistrationForm -> onSendClick', canRegister);
  if (canRegister) {
    emit('register', dto);
  } else {
    emit('login', dto);
  }
};
</script>

<template>
  <v-card class="mx-auto pa-4"
          width="364px">
  <h1 v-if="registration"
      class="pa-4 text-h5"
  > Registration </h1>
  <h1 v-else
      class="pa-4 text-h5"> Login </h1>
  <hr>
  <div v-if="errors.length > 0">
    <div
        v-for="(error, index) in errors"
        :key="index"
        style="color: red;"
    >
      <small>{{ error }}</small>
    </div>
    <hr>
  </div>
  <div v-if="registration">
    <v-text-field
        label="Name"
        hide-details="auto"
        ref="inputName"
        id="name"
    ></v-text-field>
  </div>
  <div>
    <v-text-field
        label="Username"
        hide-details="auto"
        id="username"
        ref="inputUsername"
    ></v-text-field>
  </div>
  <div v-if="registration">
    <v-text-field
        label="Email"
        hide-details="auto"
        id="email"
        ref="inputEmail"
    ></v-text-field>
  </div>
  <div>
    <v-text-field
        label="Password"
        hide-details="auto"
        id="password"
        ref="inputPassword"
    ></v-text-field>
  </div>
  <div v-if="registration">
    <v-text-field
        label="Confirm"
        hide-details="auto"
        id="confirm"
        ref="inputConfirm"
    ></v-text-field>
  </div>
  <div style="margin: 1rem 0;">
    <v-btn @click="onSendClick">
      Send
    </v-btn>
  </div>
  <div>
    <slot />
  </div>
  </v-card>
</template>

<style scoped></style>