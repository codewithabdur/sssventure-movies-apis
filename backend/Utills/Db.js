import sql from 'mssql'

let poolPromise

function getConfig() {
  const requiredVariables = ['DB_USER', 'DB_PASSWORD', 'DB_SERVER', 'DB_DATABASE']
  const missingVariables = requiredVariables.filter((key) => !process.env[key])

  if (missingVariables.length > 0) {
    throw new Error(`Missing required database configuration: ${missingVariables.join(', ')}`)
  }

  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT) || 1433,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  }
}

/**
 * Returns one shared connection pool and reuses an in-flight connection attempt.
 */
export function getPool() {
  if (poolPromise) {
    return poolPromise.then((pool) => {
      if (pool.connected) return pool
      poolPromise = undefined
      return getPool()
    })
  }

  const connectionPool = new sql.ConnectionPool(getConfig())
  poolPromise = connectionPool.connect()
    .then((pool) => {
      pool.on('error', (error) => {
        console.error('SQL Server pool error:', error)
      })
      return pool
    })
    .catch((error) => {
      poolPromise = undefined
      throw error
    })

  return poolPromise
}

export async function closePool() {
  if (!poolPromise) return

  const connection = poolPromise
  poolPromise = undefined
  const pool = await connection
  await pool.close()
}

export { sql }
