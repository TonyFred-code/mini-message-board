import { Router } from "express";
import {
  createMessageGet,
  createMessagePost,
  getMessage,
  getMessages,
} from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/new", createMessageGet);
indexRouter.post("/new", createMessagePost);
indexRouter.get("/message/:messageId", getMessage);
indexRouter.get("/", getMessages);

export { indexRouter };
