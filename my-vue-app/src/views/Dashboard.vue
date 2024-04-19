<template>
    <PageComponent title="Dashboard">
      <div v-if="loading" class="flex justify-center">Завантаження...</div>
      <div v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700"
        >
        <div
          class="bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down order-1 lg:order-2"
          style="animation-delay: 0.1s"
          >
          <h3 class="text-2xl font-semibold">Всього опитувань</h3>
          <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
            {{ data.totalSurveys }}
          </div>
        </div>
        <div
          class="bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down order-2 lg:order-4"
          style="animation-delay: 0.2s"
        >
          <h3 class="text-2xl font-semibold">Всього відповідей</h3>
          <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
            {{ data.totalAnswers }}
          </div>
        </div>
        <div
          class="row-span-2 bg-white p-4 shadow-md animate-fade-in-down order-3 lg:order-1"
          >
          <h3 class="text-2xl font-semibold">Останнє опитування</h3>
          <img
            :src="data.latestSurvey.image_url"
            class="w-[240px] mx-auto"
            alt=""
          />
          <h3 class="font-bold text-xl mb-3">{{ data.latestSurvey.title }}</h3>
          <div class="flex justify-between text-sm mb-1">
            <div>Дата завантаження</div>
            <div>{{ data.latestSurvey.created_at }}</div>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <div>Дата створення:</div>
            <div>{{ data.latestSurvey.created_at }}</div>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <div>Дата закінчення:</div>
            <div>{{ data.latestSurvey.expire_date }}</div>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <div>Статус:</div>
            <div>{{ data.latestSurvey.status ? 'Активний' : 'Неактивний' }}</div>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <div>Запитання:</div>
            <div>{{ data.latestSurvey.questions }}</div>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <div>Відповіді:</div>
            <div>{{ data.latestSurvey.answers }}</div>
          </div>
            <div class="flex justify-between">
              <router-link
                :to="{ name: 'SurveyView', params: { id: data.latestSurvey.id } }"
                class="flex py-2 px-4 border border-transparent etxt-sm rounded-md text-indigo-500
                hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

                Редагувати опитування
              </router-link>
              <button
                class="flex py-2 px-4 border border-transparent etxt-sm rounded-md text-indigo-500
                hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

                Перегляд відповідей
              </button>
            </div>

        </div>
        <div
          class="row-span-2 bg-white shadow-md p-3 animate-fade-in-down order-4 lg:order-3"
          style="animation-delay: 0.4s"
          >
          <div class="flex justify-between items-center mb-3 px-2">
            <h3 class="text-2xl font-semibold">Останні відповіді</h3>
            <a
              href="javascript:void(0)"
              class="text-sm text-blue-500 hover:decoration-blue-500"
            >
              Побачити всі
            </a>
          </div>
          <a
            href="#"
            v-for="answer of data.latestAnswers"
            :key="answer.id"
            class="block p-2 hover:bg-gray-100/90"
          >
            <div class="font-semibold">{{ answer.survey.title }}</div>
            <small>
              Відповідь дана:
              <i class="font-semibold">{{ answer.end_date }}</i>
            </small>
          </a>
        </div>

      </div>
    </PageComponent>

</template>

  <script setup>
  import PageComponent from '../components/PageComponent.vue';
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const loading = computed(() => store.state.dashboard.loading);
  const data = computed(() => store.state.dashboard.data);
  console.log(data);

  store.dispatch('getDashboardData');
  </script>
