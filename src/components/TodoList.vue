<template>
  <div class="todo-list bg-gray-200 w-72 p-4 text-left rounded-lg">
    <div class="todo-list-name text-slate-800 font-bold pl-2">
      {{ list.name }}
    </div>
    <div class="todo-list-item-container flex flex-col gap-y-2">
      <div
        v-for="todoItem in list.todoList"
        :key="todoItem"
        class="todo-list-item bg-white rounded-lg p-2"
      >
        {{ todoItem.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoList',
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss"></style>
