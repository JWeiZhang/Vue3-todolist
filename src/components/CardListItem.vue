<template>
  <div class="card-list-item bg-white hover:bg-gray-100 rounded-lg p-2 select-none cursor-pointer">
    {{ cardItem.title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardListItem',
  props: {
    cardItem: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
});
</script>
