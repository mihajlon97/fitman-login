import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from './services/AuthService'

import {router} from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      user: null,
      loginError: null
  },
  mutations: {
    authUser (state, userData) {
        this.loginError = null;
        console.log(userData);
        state.user = {
            token: userData.token,
            role: userData.role
        }
    },
      setLoginError (state, loginError) {
        state.loginError = loginError
      },
    storeUser (state, user) {
        state.user = user
    },
    clearAuthData (state) {
        state.user.token = null
        state.user.role = null
    }
  },
  actions: {
    login ({ commit, dispatch}, authData) {
        AuthService.login({
            username: authData.username,
            password: authData.password
        })
            .then(res => {
              console.log(res)
                if(res.data.error) {
                    commit('setLoginError', res.data.error);
                  return;
                }
              commit('authUser', {
                  token: res.data.token,
                  role: res.data.data.role
              })
                if(res.data.data.role === 'trainer') {
                    window.$cookies.set('token', res.data.token, Infinity)
                    window.$cookies.set('role', res.data.data.role, Infinity)
                    alert('Login Success! There is no trainer app yet!');
                    // window.location.href = 'http://localhost:8000/statistics';
                    // dispatch('logout');
                    return;
                } else if(res.data.data.role === 'admin') {
                    window.$cookies.set('token', res.data.token, Infinity)
                    window.$cookies.set('role', res.data.data.role, Infinity)
                    // window.location.href = 'http://localhost:3333/statistics';
                    // dispatch('logout');
                    alert('Login Success! There is no admin app yet!');
                    return;
                }

                router.push('/');
            })
            .catch(error => console.log(error))
    },
    logout ({commit}) {
        commit('clearAuthData')
        commit('setLoginError', null)
        router.push('/signin')
    }
  },
  getters: {
      getToken (state) {
          return state.user ? state.user.token : 'No-Token'
      },
      getRole (state) {
          return state.user ? state.user.role : 'No-Token'
      },
      getLoginError (state) {
          return state.loginError
      },
      isAuthenticated (state) {
        return state.user ? state.user.token !== null : false
      }
  }
})
