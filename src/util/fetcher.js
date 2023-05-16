import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_API_URL

const APIs = axios.create({
  baseURL
})

export { APIs }
