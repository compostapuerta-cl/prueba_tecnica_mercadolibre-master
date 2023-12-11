import axios from 'axios'

/**
 * Creates an instance of Axios with a configured baseURL
 * @returns axios instance
 */
export function createAxiosInstance () {
  const instance = axios.create({
    baseURL: 'http://localhost:3001/api'
  })

  return instance
}
