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
    ],
  },
  {
    id: 200,
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

          ],
        },
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
    dashboard: {
      loading: false,
      data: {},
    },
    surveys: {
      loading: false,
      links: [],
      data: [],
    },
    currentSurvey: {
      loading: false,
      data: {},
    },
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    notification: {
      show: false,
      type: null,
      message: 'Helo',
    },
  },
  getters: {},
  actions: {
    getDashboardData({commit}) {
      commit('setDashboardLoading', true);
      return axiosClient.get('/dashboard')
        .then((res) => {
          commit('setDashboardLoading', false);
          commit('setDashboardData', res.data);
          return res;
        })
        .catch((err) => {
          commit('setDashboardLoading', false);
          return err;
        })
    },
    getSurvey({ commit }, id) {
      commit('setCurrentSurveyLoading', true);
      return axiosClient
              .get(`/survey/${id}`)
              .then((res) => {

              commit('setCurrentSurvey', res.data);
              commit('setCurrentSurveyLoading', false);
              return res;
            })
            .catch((err) => {
              commit('setCurrentSurveyLoading', false);
              throw err;
            });
    },
    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if(survey.id) {
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit('setCurrentSurvey', res.data);
            return res;
          });
      } else {
        response = axiosClient
          .post('/survey', survey)
          .then((res) => {
            commit('setCurrentSurvey', res.data);
            return res;
          });
      }
      return response;
      console.log(response);
    },
    deleteSurvey({}, id) {
      return axiosClient.delete(`/survey/${id}`);
    },
    getSurveys({ commit }, {url = null} = {}) {
      this.commit('setSurveysLoading', true)
      url = url || '/survey'
      return axiosClient.get(url).then((res) => {
        commit('setSurveysLoading', false);
        commit('setSurveys', res.data);
        return res;
      });
    },
    getSurveyBySlug({ commit }, slug) {
      commit('setCurrentSurveyLoading', true);
      return axiosClient
              .get(`/survey-by-slug/${slug}`)
              .then((res) => {
                commit('setCurrentSurvey', res.data);
                commit('setCurrentSurveyLoading', false);
                return res;
              })
              .catch((err) => {
                commit('setCurrentSurveyLoading', false);
                throw err;
              })
    },
    saveSurveyAnswer({ commit }, {surveyId, answers}) {
      return axiosClient.post(`/survey/${surveyId}/answer`, {answers});
    },
    register({ commit }, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data)
          return data;
        })
    },
    login({ commit }, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data)
          return data;
        })
    },
  },
  mutations: {
    setDashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data;
      state.surveys.links = surveys.meta.links;
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data];
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if(s.id == survey.data.id) {
          return survey.data;
        }
        return s;
      });
    },
    logout: state => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },
    notify: (state, {message, type} ) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    },
  },
  modules: {},
})

export default store;

