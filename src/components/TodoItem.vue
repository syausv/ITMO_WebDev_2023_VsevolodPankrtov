<template>
  <div>{{ index }}) {{ text }}
    <button @click="$emit('delete')">
      x
    </button>
  </div>
</template>

<script>
export default {
  name: 'ToDoItem',
  props: {
    index:{
      type: Number,
      default:0
    },
    text:{
      type: String,
      default: "-"
    }
  },
  emits:['delete']
};
</script>

<style scoped>

</style>