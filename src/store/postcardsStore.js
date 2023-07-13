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
      //console.log('> usePostCardsStore -> createPostCard: ', { todoText: postcardText});
      console.log('> usePostCardsStore -> createPostCard: ',postForLocal);
     // let ImageAndCaption = [postcardText,picture];
      this.postcards.push(postForLocal);

      console.log('>>>>>>>>>>>>>>>>>>createPostCard',this.postcards);
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