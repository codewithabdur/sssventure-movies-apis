import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import postRoutes from "./Routes/Post.routes.js";
import fetchPostRoutes from "./Routes/fetcpost.routes.js";

const app = express();

app.set("trust proxy", 1); // needed if you're behind nginx / IIS / a proxy, so rate limiting sees real IPs
// ---------- CORS allowlist ----------
const allowedOrigins = [
  "https://corexark.imaginary-realms.in",
  "https://sssventure.imaginary-realms.in",
  "https://docs.google.com",
  "https://script.google.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:9000",
  "https://movies.imaginary-realms.in",
]
  .map((o) => o.trim())
  .filter(Boolean);
// .env example: ALLOWED_ORIGINS=https://sssventure.imaginary-realms.in,http://localhost:5173

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
    maxAge: 600,
  }),
);


app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) =>
  res.json({
    status: "OK",
    message: "Welcome to the Movies API",
  }),
);
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/posts", postRoutes);
app.use("/api/posts", fetchPostRoutes);


export default app;
