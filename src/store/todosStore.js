import {defineStore} from 'pinia';


export const useTodosStore = defineStore('todos', {
  state: () => ({ todos: [], }),
  getters: {
    getTodoByIndex: (state) => {
      return (index) => state.todos[index];
    },
    getTodosCount: (state) => state.todos.length,
  },
  actions: {
    createTodo(todoText,inputImage) {
      console.log('> useTodosStore -> createTodo: ', { todoText, inputImage});
      this.todos.push(todoText,inputImage);
      console.log('createTodo',this.createTodo);
    },
    deleteTodoByIndex(index) {
      console.log('> useTodosStore -> deleteTodoByIndex: ', { index });
      this.todos.splice(index, 1);
    },
    editTodoTextByIndex(index, text) {
      console.log('> useTodosStore -> editTodoTextByIndex: ', { index, text });
      this.todos[index] = text;
    },
  },
  persist: true
});