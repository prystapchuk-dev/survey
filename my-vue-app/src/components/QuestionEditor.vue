<template>
  <!-- Question Index -->
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">
      {{ index + 1 }}. {{ model.question }}
    </h3>

    <div class="flex items-center">
    <!-- Add new question -->
      <button
        type="button"
        @click="addQuestion()"
        class="flex items-center text-sm py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Додати
      </button>
    <!--/ Add new question -->

    <!-- Delete question -->
      <button
        type="button"
        @click="deleteQuestion()"
        class="flex items-center text-sm py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        Видалити
      </button>
    <!--/ Delete question -->
    </div>
  </div>
  <!--/ Question Index -->
  <div class="grid gap-3 grid-cols-12">
    <!-- Question -->
    <div class="mt-3 col-span-9">
      <label
        :for="'question_text_' + model.data"
        class="block text-sm font-medium text-gray-700">
        Текст запитання
      </label>
      <input
        type="text"
        :name="'question_text_' + model.data"
        id="'question_text_' + model.data"
        v-model="model.question"
        @change="dataChange"
        class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
    </div>
    <!--/ Question -->

    <!-- Question type -->
    <div class="mt-3 col-span-3">
      <label for="question_type" class="block text-sm font-medium text-gray-700">
        Тип запитання
      </label>
      <select
        id="question_type"
        name="question_type"
        v-model="model.type"
        @change="typeChange"
        class="mt-1 block w-full py-2 px-3 sm:text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option v-for="type in questionTypes" :key="type" :value="type">
          {{ capitalize(type) }}
        </option>
      </select>
    </div>
    <!--/ Question type -->
  </div>
  <!-- Question description -->
  <div class="mt-3 col-span-9">
    <label
      :for="'question_description_' + model.id"
      class="block text-sm font-medium text-gray-700">
      Опис
    </label>
    <textarea
      :name="'question_description_' + model.id"
      v-model="model.description"
      @change="dataChange"
      :id="'question_description_' + model.id"
      class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>
  <!--/ Question description -->

  <!-- Data -->
  <div>
    <div v-if="shouldHaveOptions()" class="mt-2">
      <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
        Опції

        <!-- Add new option -->
        <button
          type="button"
          @click="addOption()"
          class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Додати опцію
        </button>
        <!--/ Add new option -->
      </h4>
      <div
        v-if="!model.data.options.length"
        class="text-sm text-gray-600 text-center py-3"
      >
        Ви не маєте опцій
      </div>

      <!-- Option list-->
      <div
        v-for="(option, index) in model.data.options"
        :key="option.uuid"
        class="flex items-center mb-1"
      >
        <span class="w-6 text-sm"> {{ index + 1 }}. </span>
        <input
          type="text"
          v-model="option.text"
          @change="dataChange"
          class="w-full rounded-md py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
        />

        <!-- Delete Option -->
        <button
          type="button"
          @click="removeOption(option)"
          class="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>

        </button>
        <!--/ Delete Option -->

      </div>
      <!--/ Option list-->
    </div>
  </div>
  <!--/ Data -->
  <hr class="my-4">
</template>

<script setup>
import { ref, computed, capitalize } from "vue";
import  store  from "../store";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  question: Object,
  index: Number,
});

const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion']);

const model = ref(JSON.parse(JSON.stringify(props.question)));

const questionTypes = computed(()=>store.state.questionTypes);

function shouldHaveOptions() {
  return ['select', 'radio', 'checkbox'].includes(model.value.type);
}

function getOptions() {
  return model.value.data.options;
}

function setOptions(options) {
  return model.value.data.options = options;

}


function addOption() {
  setOptions([
    ...getOptions(),
    { uuid: uuidv4(), text: '' },
  ]);
  dataChange();
}

function removeOption(option) {
  setOptions(getOptions().filter(
    (opt) => opt !== option
  ));
  dataChange();
}

function typeChange() {
  if(shouldHaveOptions()) {
    setOptions(getOptions() || []);
  }
  dataChange();
}

function dataChange() {
  const data = JSON.parse(JSON.stringify(model.value));
  if(!shouldHaveOptions()) {
    delete data.data.options;
  }

  emit('change', data);
}

function addQuestion() {
  emit('addQuestion', props.index + 1);
}

function deleteQuestion() {
  emit('deleteQuestion', props.question);
}

</script>

