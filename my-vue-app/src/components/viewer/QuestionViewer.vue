<template>
  <fieldset class="mb-4">
    <div>
      <legend class="text-base font-medium to-gray-900">
        {{ index + 1 }}. {{ question.question }}
      </legend>
    </div>
    <div class="mt-3">

    </div>
  </fieldset>
  <hr class="mb-4">
</template>

<script setup>
import { ref } from 'vue';
const { question, index, modelValue } = defineProps({
  question: Object,
  index: Number,
  modelValue: [String, Array],
})

const emits = defineEmits(['update:modelValue']);

let model;
if (question.type === 'checkbox') {
  model = ref({});
}
</script>

