import { getDatabaseHealth } from '../Services/healthService.js'

export function getApiHealth(request, response) {
  response.json({
    status: 'ok',
    service: 'movies-api',
  })
}

export async function getDatabaseStatus(request, response, next) {
  try {
    const health = await getDatabaseHealth()
    response.json(health)
  } catch (error) {
    next(error)
  }
}
