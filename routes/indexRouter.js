import { Router } from "express";
import { messageRouter } from "./messageRouter.js";
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const indexRouter = Router();

indexRouter.use("/new", messageRouter);
indexRouter.post("/new", (req, res) => {
  const { text, user } = req.body;
  messages.push({ text: text, user: user, added: new Date() });
  res.redirect("/");
});

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages });
});

export { indexRouter };
