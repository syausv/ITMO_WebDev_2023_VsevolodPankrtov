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
    async createPostCards(postsFromPocketBase) {
     // this.postcards.value
      console.log('> usePostCardsStore -> before this.postcards:',this.postcards);
      console.log('> usePostCardsStore -> createPostCards from PocketBase: ', postsFromPocketBase);

     // let ImageAndCaption = [postcardText,picture];
      this.postcards = postsFromPocketBase;

      console.log('> usePostCardsStore -> createPostCards this.postcards:',this.postcards);
    },
    createPostCard(postcardText, picture) {
      console.log('> usePostCardsStore -> createPostCard: ', { todoText: postcardText});
     let ImageAndCaption = [postcardText,picture];
      this.postcards.push(ImageAndCaption);

      console.log('createTodo',this.createPostCard);
    },
    deletePostCardByIndex(index) {
      console.log('> usePostCardsStore -> deletePostCardByIndex: ', { index });
      this.postcards.splice(index, 1);

    },
    editPostCardTextByIndex(index, text) {
      //console.log('> useTodosStore -> editTodoTextByIndex: ', { index, text });
      //console.log('> useTodosStore -> editTodoTextByIndex:  this.postcards',  this.postcards);
     // console.log('> useTodosStore -> editTodoTextByIndex:  this.postcards[index]',  this.postcards.id);
     // this.postcards.index = text;
      // this.postcards.value


      /*const car = this.postcards.find(function (item) {
        return item.id === index;
      });*/

    },
  },
  persist: true
});