<template>
  <teleport to="body">
    <div
      class="modal absolute top-0 left-0 right-0 bottom-0 flex-center flex-col"
      @click.self="$emit('closeCardDetailModal')"
    >
      <div class="card max-w-3xl flex flex-col bg-gray-200 w-full h-96 p-4 gap-y-4">
        <!-- Title -->
        <div class="title w-full flex justify-start items-center gap-x-2">
          <svg class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <div v-if="!modifyingTitle" class="flex-grow" @click="onClickTitle">
            {{ modifyingCard.title }}
          </div>
          <div v-else class="flex-grow w-full">
            <input
              ref="titleInput"
              v-model="localModifyingCard.title"
              class="w-full"
              type="text"
              @blur="updateCard"
            />
          </div>
        </div>
        <!-- Description -->
        <div class="description w-full flex justify-start gap-x-2">
          <svg class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          <div class="flex-grow flex flex-col justify-start gap-y-4">
            <span>描述</span>

            <div v-if="modifyingDescription">
              <textarea
                v-model="localModifyingCard.description"
                rows="3"
                class="w-full rounded-lg p-2 focus:outline-0"
                @blur="updateCard"
              ></textarea>

              <div
                class="clickable w-16 text-white bg-blue-500 hover:bg-blue-600 rounded-lg py-1 px-4"
                @click="updateCard"
              >
                儲存
              </div>
            </div>
            <div
              v-else-if="modifyingCard.description.length > 0"
              class="w-full cursor-pointer"
              @click="onClickDescription"
            >
              {{ modifyingCard.description }}
            </div>
            <div
              v-else
              class="w-full h-16 bg-gray-300 hover:bg-gray-400 p-2 rounded-sm cursor-pointer"
              @click="onClickDescription"
            >
              新增更詳細的敘述
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    modifyingCard: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['closeCardDetailModal', 'update:modifyingCard'],
  setup(props, { emit }) {
    const modifyingTitle = ref(false);
    const titleInput = ref<HTMLInputElement | null>(null);
    const modifyingDescription = ref(false);
    const localModifyingCard = reactive({ ...props.modifyingCard });
    return {
      modifyingTitle,
      titleInput,
      modifyingDescription,
      localModifyingCard,
      onClickTitle() {
        modifyingTitle.value = !modifyingTitle.value;

        nextTick(() => {
          if (titleInput.value) {
            titleInput.value.focus();
          }
        });
      },
      onClickDescription() {
        modifyingDescription.value = !modifyingDescription.value;
      },
      updateCard() {
        emit('update:modifyingCard', localModifyingCard);
        modifyingTitle.value = false;
        modifyingDescription.value = false;
      },
    };
  },
});
</script>

<style>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
