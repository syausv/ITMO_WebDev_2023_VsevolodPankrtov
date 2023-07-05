<script setup>
import { ref } from 'vue';

const props = defineProps({
  registration: { type: Boolean, default: false },
  title: { type: String, default: '' },
  errors: { type: Array, default: () => [] },
});

const emit = defineEmits(['login', 'register']);

const inputUsername = ref(null);
const inputName = ref(null);
const inputEmail = ref(null);
const inputPassword = ref(null);
const inputConfirm = ref(null);

const checkPasswordsMatch = () => inputPassword.value.value === inputConfirm.value?.value;
//const checkEmailsMatch = () => inputEmail.value.value === inputConfirm.value?.value;

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
  <h1 >{{ title }}</h1>
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
    <label for="Name">Name:</label>
    <input
        id="name"
        ref="inputName"
    >
  </div>
  <div>
    <label for="username">Username:</label>
    <input
        id="username"
        ref="inputUsername"
    >
  </div>
  <div v-if="registration">
    <label for="email">Email:</label>
    <input
        id="email"
        ref="inputEmail"
    >
  </div>
  <div>
    <label for="password">Password:</label>
    <input
        id="password"
        ref="inputPassword"
    >
  </div>
  <div v-if="registration">
    <label for="confirm">Confirm:</label>
    <input
        id="confirm"
        ref="inputConfirm"
    >
  </div>
  <div style="margin: 1rem 0;">
    <button @click="onSendClick">
      Send
    </button>
  </div>
  <div>
    <slot />
  </div>
</template>

<style scoped></style>