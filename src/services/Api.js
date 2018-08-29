import axios from 'axios'
import store from '../store'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:4444/v1'
    /*headers: {
        Authorization: `Bearer ${store.token}`
    }*/
  })
}
