<template>
  <div v-show="creating" class="new-item">
    <textarea
      v-model="newItemTitle"
      rows="3"
      class="w-full rounded-lg p-2 focus:outline-0"
      @blur="createNewItem"
    ></textarea>
    <div
      class="clickable w-24 text-white bg-blue-500 hover:bg-blue-600 rounded-lg py-1 px-4"
      @click="createNewItem"
    >
      新增卡片
    </div>
  </div>
  <div
    v-show="!creating"
    class="hover:bg-gray-300 text-slate-500 select-none cursor-pointer rounded-lg p-2"
    @click="creating = true"
  >
    新增卡片
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CardListNewItem',
  emits: ['createNewItem'],
  setup(_props, { emit }) {
    const newItemTitle = ref('');
    const creating = ref(false);
    return {
      creating,
      newItemTitle,
      createNewItem: () => {
        if (newItemTitle.value.length > 0) {
          emit('createNewItem', newItemTitle.value.toString());
          creating.value = false;
          newItemTitle.value = '';
        }
      },
    };
  },
});
</script>
