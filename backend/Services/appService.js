import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import apiRoutes from '../Routes/apiRoutes.js'

function getAllowedOrigins() {
  return (process.env.FRONTEND_URL || 'http://localhost:5178')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors({
    origin: getAllowedOrigins(),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }))
  app.use(express.json({ limit: '100kb' }))
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
  app.get('/', (request, response) => {
    response.json({
      status: 'ok',
      service: 'movies-api',
      health: '/api/health',
    })
  })
  app.use('/api', apiRoutes)

  app.use((request, response) => {
    response.status(404).json({
      error: {
        message: `Route not found: ${request.method} ${request.originalUrl}`,
      },
    })
  })

  app.use((error, request, response, next) => {
    if (response.headersSent) {
      next(error)
      return
    }

    const statusCode = Number.isInteger(error.status) ? error.status : 500
    if (statusCode >= 500) {
      console.error('Unhandled API error:', error)
    }

    response.status(statusCode).json({
      error: {
        message: statusCode >= 500 ? 'Internal server error' : error.message,
      },
    })
  })

  return app
}
