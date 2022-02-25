<template>
  <div class="todo-list-item bg-white hover:bg-gray-100 rounded-lg p-2 select-none cursor-pointer">
    {{ todoItem.title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoListItem',
  props: {
    todoItem: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
});
</script>
