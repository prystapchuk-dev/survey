
<template>
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
    <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Register for free
    </h2>
    <p class="mt-4 text-center text-sm text-gray-500">
      Or
      {{ ' ' }}
      <router-link :to="{ name: 'Login' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        login to your account
      </router-link>
    </p>
  </div>
        <form  @submit="register">
          <Alert
            v-if="Object.keys(errors).length"
            class="flex-col items-stretch text-sm"
          >
          <span
              @click="errors = ''"
              class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer
              hover:bg-[0,0,0,0.2]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="nz sb ayz">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path>
              </svg>
            </span>
            <div v-for="(field, i) of Object.keys(errors)" :key="i">
              <div v-for="(error, ind) of errors[field] || []" :key="ind">
                * {{ error }}
              </div>
            </div>
          </Alert>
          <div>
            <input v-model="user.name" id="fullname" name="name" type="text" autocomplete="email" required="" placeholder="Ім'я" class="block w-full rounded-t-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-b-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>

              <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" required="" placeholder="Ел.пошта"  class="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

          </div>

          <div>
            <input v-model="user.password"  id="password" name="password" type="password" autocomplete="current-password" required="" placeholder="Пароль" class="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <input v-model="user.password_confirmation" id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password" required="" placeholder="Підтвердіть пароль" class="block w-full rounded-b-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div class="mt-6">
            <button
              :disabled="loading"
              :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}"
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Зареєструватися
            </button>
          </div>
        </form>
  </template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from 'vue';
import Alert from '../components/Alert.vue';

const store = useStore();
const router = useRouter();

const user = {
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
}

const errors = ref({});
const loading = ref(false);

function register(ev) {
  ev.preventDefault();
  loading.value = true;
  store
    .dispatch('register', user)
    .then((res) => {
      loading.value = false;
      router.push({ name: 'Dashboard' })
    })
    .catch((err) => {
      if (err.response.status === 422) {
        loading.value = false;
        errors.value = err.response.data.errors;
        console.log(errors.value);
      }
    })
}

</script>

<style scoped>
</style>
