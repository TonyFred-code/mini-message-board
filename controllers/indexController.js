import { body, matchedData, validationResult } from "express-validator";
import {
  getAllMessages,
  getMessageById,
  insertMessage,
} from "../db/queries.js";

async function createMessageGet(req, res) {
  res.render("form");
}

const validateMessageInputs = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("Username field cannot be empty")
    .isAlphanumeric("en-US", { ignore: "_-" })
    .withMessage(
      "Username can only contain letters, numbers, underscores and hyphens"
    )
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 characters"),
  body("text")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Text must not exceed 255 characters"),
];

async function createMessagePostHandler(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("errors", {
      errors: errors.array(),
    });
  }

  const { user, text } = matchedData(req);

  await insertMessage(user, text);
  res.redirect("/");
}

const createMessagePost = [...validateMessageInputs, createMessagePostHandler];

async function getMessages(req, res) {
  const messages = await getAllMessages();

  console.log("Messages: ", messages);

  res.render("index", { title: "Mini Message Board", messages });
}

async function getMessage(req, res) {
  const messageId = req.params.messageId;

  const messageDetails = await getMessageById(messageId);

  if (!messageDetails) {
    res.status(404).send("Message Not Found");
    return;
  }

  console.log(messageDetails);

  res.render("message", {
    user: messageDetails.user_name,
    text: messageDetails.text,
    added: messageDetails.added,
  });
}

export { createMessageGet, createMessagePost, getMessages, getMessage };
