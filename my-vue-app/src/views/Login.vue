<template>
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
    <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign in to your account
    </h2>
    <p class="mt-4 text-center text-sm text-gray-500">
      Or
      {{ ' ' }}
      <router-link :to="{ name: 'Register' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        register for free
      </router-link>
    </p>
  </div>
        <form class="" @submit="login" method="POST">
          <Alert v-if="errors">
            {{ errors }}
            <span
              @click="errors = ''"
              class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer
              hover:bg-[0,0,0,0.2]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="nz sb ayz">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path>
              </svg>
            </span>
          </Alert>

          <div>
            <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" required="" placeholder="Ел.пошта" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
          <div>
            <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required="" placeholder="Пароль" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
          <div class="flex items-center justify-between">
          <div class="mt-4 flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="user.remember"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
    </div>
          <div class="mt-6">
            <button
              :disabled="loading"
              type="submit"
              :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}"
              class="flex w-full justify-center
            rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white
            shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Увійти
            </button>
          </div>
        </form>


  </template>

<script setup>
import { RouterLink } from 'vue-router';
import store from "../store";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Alert from '../components/Alert.vue';

const router = useRouter();

const user = {
  email: '',
  password: '',
  remember: false
}

const loading = ref(false);
const errors = ref({});

function login(ev) {
  ev.preventDefault();
  loading.value = true;

  store.dispatch('login', user)
    .then(() => {
      loading.value = false;
      router.push({ name: 'Dashboard' })
    })
    .catch((err) => {
      if (err.response.status === 422) {
        console.log(err.response);
        errors.value = err.response.data.message;


      }
    })

}
</script>
<style scoped>
</style>
