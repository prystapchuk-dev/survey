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
            <button  type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Увійти
            </button>
          </div>
        </form>
        
        
  </template>

<script setup>
import { RouterLink } from 'vue-router';
import store from "../store";
import { useRouter } from 'vue-router';

const router = useRouter();

const user = {
  email: '',
  password: '',
  remember: false
}

function login(ev) {
  ev.preventDefault();

  store.dispatch('login', user)
    .then(() => {
      router.push({ name: 'Dashboard' })
    });

}
</script>
<style scoped>
</style>