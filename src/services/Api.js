import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:1111/v1'
  })
}
