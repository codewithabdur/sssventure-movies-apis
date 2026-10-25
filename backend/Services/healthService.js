import { getPool } from '../Utills/Db.js'

export async function getDatabaseHealth() {
  const pool = await getPool()
  await pool.request().query('SELECT 1 AS connected')

  return {
    status: 'ok',
    database: 'connected',
  }
}
