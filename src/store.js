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
    signup ({commit, dispatch}, authData) {
      /*axios.post('/signupNewUser?key=AIzaSyCXlVPPWknVGhfc60mt7Jkv0Xzrho7_mwc', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken
            //userId: res.data.localId
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('storeUser', authData)
          //dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))*/
    },
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
                window.$cookies.set('token', res.data.token)
                window.$cookies.set('role', res.data.data.role)
              commit('authUser', {
                  token: res.data.token,
                  role: res.data.data.role
              })
                if(res.data.data.role == 'admin') {
                    window.location.href = 'http://localhost:8000/#/panel/statistics';
                    return;
                }

                router.push('/dashboard');
            })
            .catch(error => console.log(error))
    },
    tryAutoLogin ({commit}) {
        let token = window.$cookies.get('token');
        let role = window.$cookies.get('role');
      if (!token) {
        return
      }
      commit('authUser', {
          token: token,
          role: role
      })
    },
    logout ({commit}) {
        commit('clearAuthData')
        commit('setLoginError', null)
        window.$cookies.remove('token');
        window.$cookies.remove('role');
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