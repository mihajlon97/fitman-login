import Api from './Api'

export default {
  register (data) {
    // return Api().post('/register', data)
  },
  login (data) {
    return Api().post('/user/login', data)
  },
  sendResetEmail(data) {
      console.log(data)
      return Api().post('/email/resetEmail', data)
  },
    checkTokenAndHash(data) {
        console.log(data)
        return Api().get('/email/resetEmail?h=' + data.hash, {
            headers: { Authorization: "Bearer " + data.token }
        })
    },
    changePassword(data) {
        console.log(data)
        return Api().put('/account/resetPassword', {password: data.password}, {
            headers: { Authorization: "Bearer " + data.token }
        })
    }
}
