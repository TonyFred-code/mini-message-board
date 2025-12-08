import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
import { indexRouter } from "./routes/indexRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configDotenv();

const app = express();
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const PORT = process.env.PORT || 5173;
app
  .listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  })
  .on("error", (error) => {
    console.error("Server failed to start with error: ", error);
  });
