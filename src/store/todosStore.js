import {defineStore} from 'pinia';


export const useTodosStore = defineStore('todos', {
  state: () => ({ todos: [],}),
  getters: {
    getTodoByIndex: (state) => {
      return (index) => state.todos[index];
    },
    getTodosCount: (state) => state.todos.length,
  },
  actions: {
    createTodo(todoText,picture) {
      console.log('> useTodosStore -> createTodo: ', { todoText});
     let ImageAndCaption = [todoText,picture];
      this.todos.push(ImageAndCaption);

      console.log('createTodo',this.createTodo);
    },
  /*  createImage(inputImage) {
      console.log('> useTodosStore -> createTodo: ', {inputImage});
      this.todos.push(inputImage);
      console.log('createTodo',this.createTodo);
    },*/
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