import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({ user: { name: 'Vsevolod' }, }),
  getters: {
    hasUser: (state) => !!state.user.name,
    // getTodosCount: (state) => state.postcards.length,
  },
  actions: {
    // createTodo(todoText) {
    //     console.log('> useTodosStore -> createTodo: ', { todoText });
    //     this.postcards.push(todoText);
    // },
  },
  persist: true
});