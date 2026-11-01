import "dotenv/config";
import app from "./app.js";
import { closePool } from "./Utills/Db.js";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`CorexArk API running on http://localhost:${PORT}`);
});

const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));