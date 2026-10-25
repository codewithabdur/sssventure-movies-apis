import 'dotenv/config'
import { createApp } from './Services/appService.js'
import { closePool } from './Utills/Db.js'

const port = Number(process.env.PORT) || 3000
const app = createApp()
const server = app.listen(port, () => {
  console.log(`API server listening on port ${port}`)
})


app.use("/", (req, res) => {
  res.send("API is running")
})

let isShuttingDown = false

async function shutdown(signal) {
  if (isShuttingDown) return
  isShuttingDown = true
  console.log(`${signal} received. Shutting down API server.`)

  server.close(async (error) => {
    if (error) {
      console.error('Error while closing API server:', error)
      process.exitCode = 1
    }

    try {
      await closePool()
    } catch (poolError) {
      console.error('Error while closing SQL Server pool:', poolError)
      process.exitCode = 1
    }
  })
}

process.on('SIGINT', () => void shutdown('SIGINT'))
process.on('SIGTERM', () => void shutdown('SIGTERM'))