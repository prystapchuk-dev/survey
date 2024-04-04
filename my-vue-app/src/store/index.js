import { createStore } from "vuex";
import axiosClient from "../axios.js"

const tmpSurveys = [
  {
    id: 100,
    title: 'The title',
    slug: 'the-title',
    status: 'draft',
    image: 'https://media.istockphoto.com/id/1942772853/fr/photo/a-group-of-friends-enjoying-in-the-sea.jpg?s=1024x1024&w=is&k=20&c=UkcMphlWzxX8XnpvLYhobEJcgiR-29Uv96vIG1er7BE=',
    description: 'The description',
    created_at: '2024-04-01 12:00:00',
    updated_at: '2024-04-02 12:00:00',
    expire_date: '2024-04-10 12:00:00',
    questions: [
      {
        id: 1,
        type: 'select',
        question: 'From which country are you?',
        description: null,
        data: {
          options: [
            { uuid: 'b7145815-95d8-4eb7-aca0-94805c34aa00', text: 'USA' },
            { uuid: 'fed49ca8-1f05-4248-8f36-bbe69aef959f', text: 'Georgia' },
            { uuid: '69e8c6de-6e64-4cf3-87eb-365cd915cb26', text: 'Germany' },
            { uuid: '1643d119-16f4-4ec4-a142-f896af26d069', text: 'India' },
            { uuid: '6851e4e6-50fc-445e-8f5e-1577b20c577f', text: 'United Kingdom' },
          ],
        },
      },
      {
        id: 2,
        type: 'checkbox',
        question: 'Which language videos do you?',
        description: 'Lorem ipsum description',
        data: {
          options: [
            { uuid: '01ebb193-c2dd-409f-97d4-f0faf801abe6', text: 'JavaScript' },
            { uuid: '68f775f9-90e7-4f67-a4d4-d5f5000b1b2d', text: 'PHP' },
            { uuid: 'b578f0ab-1e61-43a2-bba9-2e2355a167f8', text: 'HTML+CSS' },
            { uuid: 'de9d363b-3631-49ee-9535-ad5963e8e93c', text: 'Laravel' },
            { uuid: 'dd2ffcab-aac0-4af0-96be-365f4473f197', text: 'Symfony' },
          ],
        },
      },
      {
        id: 3,
        type: 'radio',
        question: 'Which language videos do you?',
        description: 'Lorem ipsum description',
        data: {
          options: [
            { uuid: '9e46c266-d381-462f-9f83-cbb983e52048', text: 'Laravel 5' },
            { uuid: '68f775f9-90e7-4f67-a4d4-d5f5000b1b2d', text: 'Laravel 6' },
            { uuid: 'b578f0ab-1e61-43a2-bba9-2e2355a167f8', text: 'Laravel 8' },
          ],
        },
      },
      {
        id: 4,
        type: 'text',
        question: 'What your favorite',
        description: null,
        data: {},
      },
      {
        id: 5,
        type: 'textarea',
        question: 'What your favorite',
        description: null,
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: 'The title',
    slug: 'the-title',
    status: 'draft',
    image: 'https://media.istockphoto.com/id/496355826/fr/photo/kayak-en-arri%C3%A8re-plan.jpg?s=1024x1024&w=is&k=20&c=aEQ1jZ1CwArEfbrUARRqOFcMO66aSlT0ML-_bbIv4Zs=',
    description: 'The description',
    created_at: '2024-04-01 12:00:00',
    updated_at: '2024-04-02 12:00:00',
    expire_date: '2024-04-10 12:00:00',
    questions: [
      {
        id: 1,
        type: 'select',
        question: 'From which country are you?',
        description: null,
        data: {
          options: [
            { uuid: 'b7145815-95d8-4eb7-aca0-94805c34aa00', text: 'USA' },
            { uuid: 'fed49ca8-1f05-4248-8f36-bbe69aef959f', text: 'Georgia' },
            { uuid: '69e8c6de-6e64-4cf3-87eb-365cd915cb26', text: 'Germany' },
            { uuid: '1643d119-16f4-4ec4-a142-f896af26d069', text: 'India' },
            { uuid: '6851e4e6-50fc-445e-8f5e-1577b20c577f', text: 'United Kingdom' },
          ],
        },
      },
      {
        id: 2,
        type: 'checkbox',
        question: 'Which language videos do you?',
        description: 'Lorem ipsum description',
        data: {
          options: [
            { uuid: '01ebb193-c2dd-409f-97d4-f0faf801abe6', text: 'JavaScript' },
            { uuid: '68f775f9-90e7-4f67-a4d4-d5f5000b1b2d', text: 'PHP' },
            { uuid: 'b578f0ab-1e61-43a2-bba9-2e2355a167f8', text: 'HTML+CSS' },
            { uuid: 'de9d363b-3631-49ee-9535-ad5963e8e93c', text: 'Laravel' },
            { uuid: 'dd2ffcab-aac0-4af0-96be-365f4473f197', text: 'Symfony' },
          ],
        },
      },
      {
        id: 3,
        type: 'radio',
        question: 'Which language videos do you?',
        description: 'Lorem ipsum description',
        data: {
          options: [
            { uuid: '9e46c266-d381-462f-9f83-cbb983e52048', text: 'Laravel 5' },
            { uuid: '68f775f9-90e7-4f67-a4d4-d5f5000b1b2d', text: 'Laravel 6' },
            { uuid: 'b578f0ab-1e61-43a2-bba9-2e2355a167f8', text: 'Laravel 8' },
          ],
        },
      },
      {
        id: 4,
        type: 'text',
        question: 'What your favorite',
        description: null,
        data: {},
      },
      {
        id: 5,
        type: 'textarea',
        question: 'What your favorite',
        description: null,
        data: {},
      },
    ],
  },
];
const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    surveys: [...tmpSurveys],
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post('http://localhost:8000/api/register', user)
        .then(({data}) => {
          commit('setUser', data)
          return data;
        })
    },
    login({ commit }, user) {
      return axiosClient.post('http://localhost:8000/api/login', user)
        .then(({data}) => {
          commit('setUser', data)
          return data;
        })
    },
  },
  mutations: {
    logout: state => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },
  },
  modules: {},
})

export default store;

