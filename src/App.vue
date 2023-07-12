<script setup>
import {computed, inject, onMounted, reactive, ref} from 'vue';
import AppAccountOwnerName from '@/components/AppAccountOwnerName.vue';
import AppMenu from '@/components/AppMenu.vue';
import {storeToRefs} from 'pinia';
import {useUserStore} from '@/store/userStore.js';
import PROVIDE from '@/constants/provides.js';
import ROUTES from '@/constants/routes.js';
import {useRoute} from 'vue-router';
import IndexPage from '@/pages/IndexPage.vue';



const pb = inject(PROVIDE.PB);
const user = ref(pb.authStore.model);
pb.authStore.onChange(() => {
  console.log('> App -> authStore.onChange', pb.authStore.onChange.model);
  user.value = pb.authStore.model;
});
const hasUser = computed(() => !!user.value);



const checkRouteIsNotCurrent = (routePath) => useRoute().path !== routePath;

const menuLinks = reactive([
  { name: 'Gallery', link: ROUTES.INDEX, canRender: computed(() => checkRouteIsNotCurrent(ROUTES.INDEX)) },
  { name: 'PostCards', link: ROUTES.POSTCARDS, canRender: computed(() => hasUser.value && checkRouteIsNotCurrent(ROUTES.POSTCARDS)) },
  { name: 'Sign In', link: ROUTES.SIGNIN, canRender: computed(() => !hasUser.value && checkRouteIsNotCurrent(ROUTES.SIGNIN)) },
  { name: 'Sign Out', link: ROUTES.INDEX, canRender: computed(() => hasUser.value), onClick: () => {
      console.log('SignOUT');
      pb.authStore.clear();
    } },
]);

</script>
<template >
  <div class="text-h3"> Post Cards App  </div>
    <AppMenu
        style="margin: 2rem 0;"
        :links="menuLinks"
    />
 <AppAccountOwnerName>

      <div class="ma-6 text-h6 text-grey-darken-1">
        <span
              v-if="hasUser">
          {{ user.name }}'s account</span>
        <span v-else>Please create an account or sign in to an existing one</span>
      </div>
  </AppAccountOwnerName>
    <router-view />
</template>