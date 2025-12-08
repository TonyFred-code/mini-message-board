import { Router } from "express";

const messageRouter = Router();

messageRouter.get("/", (req, res) => {
  res.render("form");
});

export { messageRouter };
