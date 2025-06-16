import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";
import "./automation.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// logs
app.use((req, res, next) => {
  console.log(
    `Method:${req.method} http://localhost:${PORT}${req.originalUrl}`
  );
  next();
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📄 Swagger docs at http://localhost:${PORT}/api-docs`);
});
