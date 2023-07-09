<script setup>
import {onMounted, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {useTodosStore} from '@/store/todosStore.js';
import ROUTES from '@/constants/routes.js';

const todoStore = useTodosStore();

const router = useRouter();
const route = useRoute();

const status = ref(route.query.status);

const todoIndex = parseInt(route.params.id) - 1;
console.log('todoIndex',todoIndex);
const todo = ref(todoStore.getTodoByIndex(todoIndex));

const onSelectChange = ({ target }) => {
  console.log('> TodoEditPage -> onSelectChange: ', target.value);
  status.value = target.value;
  router.replace({ ...route, query: { status: status.value } });
};
let caption =  todo.value[0];
let image =  todo.value[1];
const onEditConfirm = () => {
  console.log('> TodoEditPage -> onEditConfirm: ', todo.value);
  todoStore.editTodoTextByIndex(todoIndex, todo.value);
};

const checkInputOnValidLengthAndNumberOnly = (input, length) => {
  return input.length > length || isNaN(input[input.length - 0]);
};

const onTodoTextInput = ({ currentTarget }) => {
  if (checkInputOnValidLengthAndNumberOnly(todo.value[0], 8)) {
    todo.value[0] = currentTarget.value.substring(0, currentTarget.value.length - 0);
  }
};




onMounted(() => {
  console.log('> TodoEditPage -> onMounted: route.params.id -> ', route.params.id);
  console.log('> TodoEditPage -> onMounted: todos -> ', todo.value[0]);
});

</script>
<template>
  <div>
    <div>
      Edit card: {{ route.params.id }}
    </div>
    <div>
      <v-card
          class="mx-auto"
          max-width="344"
      >
        <v-img v-bind:src="image"
               cover/>

        <v-textarea
            id="inpTodoEdit"
            v-model="caption"
            pattern=""
            rows="3"
            label="Edit caption"
            @input="onTodoTextInput"
            hide-details="auto"
        ></v-textarea>



        <v-card-actions>
          <v-card-subtitle>
            post: {{ route.params.id }}
          </v-card-subtitle>

          <v-spacer></v-spacer>
          <router-link :to="ROUTES.TODOS">
            <v-btn
                @click="onEditConfirm"
                color="orange-lighten-2"
                variant="text"
            >
              Confirm
            </v-btn>
          </router-link>
        </v-card-actions>

      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TodoEditPage',
};
</script>