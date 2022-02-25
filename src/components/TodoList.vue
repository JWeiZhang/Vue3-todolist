<template>
  <div class="todo-list bg-gray-200 w-72 p-4 text-left rounded-lg flex flex-col">
    <div class="todo-list-name text-slate-800 font-bold pl-2">
      {{ list.name }}
    </div>
    <div
      class="todo-list-item-container flex flex-col gap-y-2 grow"
      @dragover.prevent
      @drop="onDrop($event, list.listId, -1)"
    >
      <todo-list-item
        v-for="(todoItem, index) in todoList"
        :key="todoItem"
        :todo-item="todoItem"
        :item-index="index"
        draggable="true"
        @dragstart="onDrag(todoItem.id)"
        @dragenter="onDragEnter(todoItem.id)"
        @dragover.prevent
        @drop="onDrop"
      >
      </todo-list-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import { TodoListItem as ITodoListItem } from '../types/TodoList';
import TodoListItem from './TodoListItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoListItem,
  },
  props: {
    list: { type: Object, required: true },
  },
  emits: ['update:list'],
  setup(props, { emit }) {
    const todoList = reactive([...props.list.todos]);
    const draggingItemId = ref<number | null>(null);
    return {
      todoList,
      onDrag: (itemId: number) => {
        // 記錄當前拖移item
        draggingItemId.value = itemId;
      },
      onDragEnter: (todoItemId: number) => {
        if (draggingItemId.value !== null) {
          // 尋找拖移以及欲交換item index
          const oriIndex = todoList.findIndex((x: ITodoListItem) => x.id === draggingItemId.value);
          const toIndex = todoList.findIndex((x: ITodoListItem) => x.id === todoItemId);

          if (oriIndex !== -1 && oriIndex !== toIndex) {
            const draggingItem = { ...todoList[oriIndex] };

            todoList.splice(oriIndex, 1);

            todoList.splice(toIndex + 1, 0, draggingItem);
          }
        }
      },
      onDrop: () => {
        // emit事件更新todos
        emit('update:list', { ...props.list, todoList });
      },
    };
  },
});
</script>

<style lang="scss"></style>
