<template>
  <div class="board w-full h-full bg-sky-100 flex p-10">
    <todo-list v-for="(list, index) in lists" :key="`list_${index}`" :list="list" />
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
          name: 'Todo',
          todoList: [
            {
              title: 'Todo1',
              content: '',
              members: [],
            },
            {
              title: 'Todo2',
              content: '',
              members: [],
            },
          ],
        },
      ]),
    };
  },
});
</script>

<style></style>
