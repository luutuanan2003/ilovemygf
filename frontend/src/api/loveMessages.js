import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
})

export async function generateMessage(category, mood) {
  const { data } = await api.post('/api/generate-message', { category, mood })
  return data
}

export async function getRandomMessage() {
  const { data } = await api.get('/api/random-message')
  return data
}

export async function healthCheck() {
  const { data } = await api.get('/api/health')
  return data
}
