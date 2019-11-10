const ENV = process.env.ENV

const API_BASE_URL = {
  PROD: 'https://todo.com/api',
  DEV: 'http://localhost:5588/api',
}

export const mockServer = 'http://localhost:8008'
export const urlMockNews = `${mockServer}/api/mock-news`

export const apiBaseUrl = API_BASE_URL[ENV]
