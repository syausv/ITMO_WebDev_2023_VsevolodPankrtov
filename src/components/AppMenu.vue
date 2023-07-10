<script setup>
defineProps({
  links: {
    type: Array,
    default: () => [],
    required: true
  }
});
</script>
<template>
  <div class="flex-row">

    <template
        v-for="menuItem in links"
        :key="menuItem.name"
    >

      <router-link
          v-if="menuItem.canRender"
          :to="menuItem.link"
          @click="menuItem.onClick"
      >

     <v-btn class="ma-4"> {{ menuItem.name }} </v-btn>


      </router-link>

    </template>
    </div>

</template>