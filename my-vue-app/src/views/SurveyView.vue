<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ route.params.id ? model.title : 'Створити опитування' }}
        </h1>
        <button v-if="route.params.id"
          type="button"
          @click="deleteSurvey()"
          class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-block">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          Видалити
        </button>
      </div>
    </template>
  </PageComponent>
  <div v-if="surveyLoading" class="flex justify-center text-zinc-800">Завантаження....</div>
  <form v-else @submit.prevent="saveSurvey" method="post" class="animate-fade-in-down">

   <pre> {{ model }} </pre>
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <!--/ Survey Fields -->
      <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
        <!-- Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Зображення
          </label>
          <div class="mt-1 flex items-center">
            <img
              v-if="model.image_url"
              :src="model.image_url"
              :alt="model.title"
              class="w-64 h-48 object-cover"
            />
            <span
              v-else
              class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[80%] h-[80%] text-gray-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </span>
            <button type="button"
                    class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <input
                type="file"
                @change="onImageChoose"
                class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
              >
              Змінити
            </button>
          </div>
        </div>
        <!--/ Image -->

        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Назва</label>
          <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" >
        </div>
        <!--/ Title -->

        <!-- Description -->
        <div>
          <label for="about" class="block text-sm font-medium text-gray-700">
            Опис
          </label>
          <div class="mt-1">
            <textarea
              id="description"
              name="description"
              rows="3"
              v-model="model.description"
              autocomplete="survey_description"
              class="shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Опишіть ваше опитування"></textarea>
          </div>
        </div>
        <!--/ Description -->

        <!-- Expire date -->
        <div>
          <label for="expire_date"
                 class="block text-sm font-medium text-gray-700">
            Кінцева дата
          </label>
          <input type="date"
                  name="expire_date"
                  id="expire_date"
                  v-model="model.expire_date"
                  class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <!--/ Expire date -->

        <!-- Status -->
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="status"
              name="status"
              type="checkbox"
              v-model="model.status"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="status" class="font-medium text-gray-700">
              Активний
            </label>
          </div>
        </div>
        <!--/ Status -->
      </div>

      <!--/ Survey Fields -->
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h3 class="text-2xl font-semibold flex items-center justify-between">
            Запитання

            <!-- Add new question -->
            <button
              type="button"
              @click="addQuestion()"
              class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-grey-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

              Додати запитання
            </button>
            <!--/ Add new question -->
          </h3>
          <div v-if="!model.questions" class="text-center text-gray-600">
            Ви не маєте створених запитань
          </div>
          <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            />
          </div>
        </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Зберегти
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/QuestionEditor.vue";
import { computed, ref, watch } from "vue";
import { useRouter, useRoute} from "vue-router";
import store from "../store";
import { v4 as uuidv4 } from "uuid";

const router = useRouter();
const route = useRoute();

const surveyLoading = computed(() => store.state.currentSurvey.loading);

let model = ref({
  title: '',
  status: false,
  description: null,
  image_url: null,
  expire_date: null,
  questions: [],
});

watch(
  () => store.state.currentSurvey.data,
  (newVal, oldVal) => {

    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

if (route.params.id) {
store.dispatch('getSurvey', route.params.id);
}

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    model.value.image = reader.result;

    model.value.image_url = reader.result;
  }
  reader.readAsDataURL(file);
}

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: 'text',
    question: '',
    description: null,
    data: {},
  };

  model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter(
    (que) => que !== question
    );
}

function questionChange(question) {
  model.value.questions = model.value.questions.map((q) => {
    if(q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}

function saveSurvey() {
  store.dispatch("saveSurvey", model.value).then(({data}) => {
    store.commit('notify', {
      type: 'success',
      message: 'Збережено',
    });
    router.push({
      name: "SurveyView",
      params: { id: data.data.id },
    });
  });
}

function deleteSurvey() {
  if(confirm('Ви дійсно хочете назавжди видалити опитування?')) {
    store.dispatch('deleteSurvey', model.value.id)
      .then(() => {
        router.push({ name: 'Surveys' });
      });
    }

}
</script>
