import sql from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT) || 1433,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool;

/**
 * Returns a shared connection pool, creating it on first use.
 * Reused across requests instead of opening a new connection each time.
 */
export const getPool = async () => {
  if (pool && pool.connected) return pool;

  pool = await new sql.ConnectionPool(config).connect();
  pool.on("error", (err) => {
    console.error("SQL Server pool error:", err);
  });

  return pool;
};

export const closePool = async () => {
  if (pool) {
    await pool.close();
    pool = null;
  }
};

export { sql };