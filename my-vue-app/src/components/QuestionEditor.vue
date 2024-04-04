<template>
  <!-- Question Index -->
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">
      {{ index + 1 }}. {{ model.question }}
    </h3>

    <div class="flex items-center">
    <!-- Add new question -->
    <!--/ Add new question -->

    <!-- Delete question -->
    <!--/ Delete question -->
    </div>
  </div>
  <!--/ Question Index -->
  <div class="grid gap-3 grid-cols-12">
    <!-- Question -->
    <!--/ Question -->

    <!-- Question type -->
    <!--/ Question type -->
  </div>
</template>

<script setup>
const props = defineProps({
  question: Object,
  index: Number,
});

const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion']);

const model = ref(JSON.parse(JSON.stringify(props.question)));
</script>

