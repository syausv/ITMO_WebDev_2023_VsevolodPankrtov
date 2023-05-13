<template>
  <AppHeader>
    Todo App
    <template #sub-header>
      <span v-if='user'> created by {{user.name}}</span>
      <span v-else>Noname</span>
    </template>
  </AppHeader>
  <input
    ref='domInput'
    v-model="inputText"
    @keyup.enter="canAddItemToTodoList && onInputEnterKeyUp()"
  >

  <div>
    List:
    <span v-if='todos.length'>
    {{ getTodoCount }}
    </span>
    <ToDoItem
      v-for="(item, index) in todos"
              :key='item'
              :index='index + 1'
              :text='item'
    @delete='onDeleteTodo(index)'/>

  </div>
</template>

<script>
import ToDoItem from './components/ToDoItem.vue';
import AppHeader from './components/AppHeader.vue';

const LOCAL_KEY_TODOS = 'todos';
const LOCAL_KEY_INPUT_TEXT = 'input_text';

export default {
  components: { AppHeader, ToDoItem },
  data: () => ({
    inputText: null,
    todos: []
  }),
  computed: {
    canAddItemToTodoList() {
      return this.todoText?.length > 0;
    },
    todoText() { return this.inputText?.trim(); }
  },
  methods: {
    onInputEnterKeyUp() {
      console.log('> App -> onInputEnterKeyUp:', this.todoText);
      this.todos.push(this.todoText);
      this.inputText = '';
    },
    onDeleteTodo(index) {
      this.todos.splice(index, 1);
    }
  },
  created() {

    const rawTodos = localStorage.getItem(LOCAL_KEY_TODOS);
    console.log("> App -> created: rawTodos =", rawTodos);
    if(rawTodos) {
      this.todos = JSON.parse(rawTodos);
    }

    this.inputText= JSON.parse(localStorage.getItem(LOCAL_KEY_INPUT_TEXT) || '');

    this.$watch( () => this.todos,(value) => {
      console.log("> App -> watch: todos =", value);
      localStorage.setItem(LOCAL_KEY_TODOS,JSON.stringify(value));
    },{deep: true});

    this.$watch( () => this.inputText,(value) => {
      console.log("> App -> watch: todos =", value);
      localStorage.setItem(LOCAL_KEY_INPUT_TEXT,JSON.stringify(value));
    });
  }
};
</script>

<style scoped>
</style>