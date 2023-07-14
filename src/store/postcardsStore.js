import {defineStore} from 'pinia';

export const usePostCardsStore = defineStore('postcardsFromPocketBase', {
  state: () => ({ postcards: [],}),
  getters: {
    getPostCardByIndex: (state) => {
      return (index) => state.postcards[index];
    },
    getPostCardsCount: (state) => state.postcards.length,
  },
  actions: {
   async  createPostCards(postsFromPocketBase) {
      console.log('> usePostCardsStore -> createPostCards from PocketBase: ', postsFromPocketBase);

      this.postcards = postsFromPocketBase;
      console.log('> usePostCardsStore -> createPostCards this.postcards:',this.postcards);

    },
    createPostCard(postForLocal) {

      console.log('> usePostCardsStore -> createPostCard: ',postForLocal);

      this.postcards.push(postForLocal);

      console.log('>>>>>>>>>>>>>>>>>>createPostCard',this.postcards);
    },
    getListOFCardsLocal() {
     return  this.postcards;

      console.log('>>>>>>>>>>>>>>>>>>createPostCard',this.postcards);
    },
    deletePostCardByIndex(index) {
      console.log('> usePostCardsStore -> deletePostCardByIndex: ',  index );

      console.log('> usePostCardsStore -> deletePostCardByIndex: ',  index );
      this.postcards.splice(index, 1);

    },
    editPostCardTextByIndex(index, data) {
      console.log('> useTodosStore -> editTodoTextByIndex: ', { index, data });
      this.postcards[index] = data;
    },
  },
  persist: true
});