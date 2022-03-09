<template>
  <div class="board w-full h-full bg-sky-100 p-10 flex gap-x-8">
    <card-list
      v-for="(list, index) in lists"
      :key="`list_${index}`"
      v-model:list="lists[index]"
      @clickItem="clickItem"
    />
    <Card
      v-if="openDetailCard"
      v-model:modifyingCard="modifyingCard"
      @closeCardDetailModal="closeCardDetailModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';

import Card from '../components/Card.vue';
import CardList from '../components/CardList.vue';
import { CardList as ICardList, CardListItem as ICardListItem } from '../types/CardList';
import uuid from '../utils/uuid';

export default defineComponent({
  name: 'Board',
  components: {
    Card,
    CardList,
  },
  setup() {
    const openDetailCard = ref(false);
    const modifyingCard = ref<ICardListItem | null>(null);
    const modifyingIndex = reactive({
      listIndex: -1,
      cardIndex: -1,
    });
    const lists = reactive<ICardList[]>([
      {
        listId: uuid(),
        name: 'Todo',
        cards: [
          {
            id: uuid(),
            title: 'Todo1',
            description: '',
            members: [],
          },
          {
            id: uuid(),
            title: 'Todo2',
            description: '',
            members: [],
          },
        ],
      },
      {
        listId: uuid(),
        name: 'Doing',
        cards: [],
      },
    ]);

    watch(modifyingCard, (value) => {
      if (value) {
        const { listIndex, cardIndex } = modifyingIndex;
        lists[listIndex].cards[cardIndex] = { ...value };
      }
    });

    return {
      openDetailCard,
      modifyingCard,
      lists,
      clickItem: (listId: string, cardId: string) => {
        openDetailCard.value = true;
        const listIndex = lists.findIndex((l) => l.listId === listId);
        const cardIndex = lists[listIndex].cards.findIndex((c) => c.id === cardId);
        if (cardIndex !== -1) {
          modifyingIndex.listIndex = listIndex;
          modifyingIndex.cardIndex = cardIndex;
          modifyingCard.value = lists[listIndex].cards[cardIndex];
        }
      },
      closeCardDetailModal() {
        openDetailCard.value = false;
      },
    };
  },
});
</script>

<style></style>
