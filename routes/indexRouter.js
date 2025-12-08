import { Router } from "express";
import { messageRouter } from "./messageRouter.js";
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    id: 1,
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    id: 2,
  },
];

const indexRouter = Router();

indexRouter.use("/new", messageRouter);
indexRouter.get("/message/:messageId", (req, res) => {
  const messageId = req.params.messageId;

  const message = messages.find((m) => m.id === Number(messageId));

  if (!message) {
    res.status(404).send("Message Not Found");
    return;
  }

  res.render("message", {
    user: message.user,
    text: message.text,
    added: message.added,
  });
});

indexRouter.post("/new", (req, res) => {
  const { text, user } = req.body;
  messages.push({
    text: text,
    user: user,
    added: new Date(),
    id: messages.length,
  });
  res.redirect("/");
});

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages });
});

export { indexRouter };
