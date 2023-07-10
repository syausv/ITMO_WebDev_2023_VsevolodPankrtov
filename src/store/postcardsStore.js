import {defineStore} from 'pinia';


export const usePostCardsStore = defineStore('postcards', {
  state: () => ({ postcards: [],}),
  getters: {
    getPostCardByIndex: (state) => {
      return (index) => state.postcards[index];
    },
    getPostCardsCount: (state) => state.postcards.length,
  },
  actions: {
    createPostCard(postcardText, picture) {
      console.log('> useTodosStore -> createTodo: ', { todoText: postcardText});
     let ImageAndCaption = [postcardText,picture];
      this.postcards.push(ImageAndCaption);

      console.log('createTodo',this.createPostCard);
    },
    deletePostCardByIndex(index) {
      console.log('> useTodosStore -> deleteTodoByIndex: ', { index });
      this.postcards.splice(index, 1);
    },
    editPostCardTextByIndex(index, text) {
      console.log('> useTodosStore -> editTodoTextByIndex: ', { index, text });
      this.postcards[index] = text;
    },
  },
  persist: true
});