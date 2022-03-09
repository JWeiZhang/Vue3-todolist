<template>
  <div class="card-list bg-gray-200 w-72 p-4 text-left rounded-lg flex flex-col">
    <div class="card-list-name text-slate-800 font-bold pl-2">
      {{ list.name }}
    </div>
    <div
      class="card-list-item-container flex flex-col gap-y-2 grow"
      @dragover.prevent
      @drop="onDrop($event, list.listId, -1)"
    >
      <card-list-item
        v-for="(cardItem, index) in cardList"
        :key="cardItem"
        :card-item="cardItem"
        :item-index="index"
        draggable="true"
        @dragstart="onDrag(cardItem.id)"
        @dragenter="onDragEnter(cardItem.id)"
        @dragover.prevent
        @drop="onDrop"
        @click="$emit('clickItem', list.listId, cardItem.id)"
      />
      <!-- 新增卡片block -->
      <CardListNewItem @createNewItem="createNewItem" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import { CardListItem as ICardListItem } from '../types/CardList';
import uuid from '../utils/uuid';
import CardListItem from './CardListItem.vue';
import CardListNewItem from './CardListNewItem.vue';

export default defineComponent({
  name: 'CardList',
  components: {
    CardListItem,
    CardListNewItem,
  },
  props: {
    list: { type: Object, required: true },
  },
  emits: ['update:list', 'clickItem'],
  setup(props, { emit }) {
    const cardList = computed(() => {
      return props.list.cards;
    });
    const draggingItemId = ref<string | null>(null);
    return {
      cardList,
      onDrag: (itemId: string) => {
        // 記錄當前拖移item
        draggingItemId.value = itemId;
      },
      onDragEnter: (todoItemId: string) => {
        if (draggingItemId.value !== null) {
          // 尋找拖移以及欲交換item index
          const oriIndex = cardList.value.findIndex(
            (x: ICardListItem) => x.id === draggingItemId.value,
          );
          const toIndex = cardList.value.findIndex((x: ICardListItem) => x.id === todoItemId);

          if (oriIndex !== -1 && oriIndex !== toIndex) {
            const draggingItem = { ...cardList.value[oriIndex] };

            cardList.value.splice(oriIndex, 1);

            cardList.value.splice(toIndex + 1, 0, draggingItem);
          }
        }
      },
      onDrop: () => {
        // emit事件更新cards
        emit('update:list', { ...props.list, cardList });
      },
      createNewItem: (title: string) => {
        cardList.value.push({
          id: uuid(),
          title,
          description: '',
          members: [],
        });
        emit('update:list', { ...props.list, cardList });
      },
    };
  },
});
</script>

<style lang="scss"></style>
