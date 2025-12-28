import {
  getAllMessages,
  getMessageById,
  insertMessage,
} from "../db/queries.js";

async function createMessageGet(req, res) {
  res.render("form");
}

async function createMessagePost(req, res) {
  const { text, user } = req.body;
  if (
    typeof text !== "string" ||
    text.trim() === "" ||
    typeof user !== "string" ||
    user.trim() === ""
  ) {
    res
      .status(400)
      .send(
        "Both 'text' and 'user' fields are required and must be non-empty."
      );
    return;
  }

  await insertMessage(user, text);
  res.redirect("/");
}

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
