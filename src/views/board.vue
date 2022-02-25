<template>
  <div class="board w-full h-full bg-sky-100 p-10 flex gap-x-8">
    <todo-list v-for="(list, index) in lists" :key="`list_${index}`" v-model:list="lists[index]" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import TodoList from '../components/TodoList.vue';

export default defineComponent({
  name: 'Board',
  components: {
    TodoList,
  },
  setup() {
    return {
      lists: reactive([
        {
          listId: 0,
          name: 'Todo',
          todos: [
            {
              id: 0,
              title: 'Todo1',
              content: '',
              members: [],
            },
            {
              id: 1,
              title: 'Todo2',
              content: '',
              members: [],
            },
          ],
        },
        {
          listId: 1,
          name: 'Doing',
          todos: [],
        },
      ]),
    };
  },
});
</script>

<style></style>
