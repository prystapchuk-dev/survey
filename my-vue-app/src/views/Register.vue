
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
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Зареєструватися
            </button>
          </div>
        </form>
  </template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const user = {
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
}

function register(ev) {
  ev.preventDefault();
  store
    .dispatch('register', user)
    .then((res) => {
      router.push({ name: 'Dashboard' })
    })
}

</script>

<style scoped>
</style>