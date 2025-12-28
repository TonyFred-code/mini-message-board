import { Router } from "express";
import {
  createMessageGet,
  createMessagePost,
  getMessages,
} from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/new", createMessageGet);
indexRouter.get("/message/:messageId", (req, res) => {
  // const messageId = req.params.messageId;

  // const message = messages.find((m) => m.id === Number(messageId));

  // if (!message) {
  //   res.status(404).send("Message Not Found");
  //   return;
  // }

  // res.render("message", {
  //   user: message.user,
  //   text: message.text,
  //   added: message.added,
  // });
  res.send("working");
});

indexRouter.post("/new", createMessagePost);

indexRouter.get("/", getMessages);

export { indexRouter };
