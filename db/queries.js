import pool from "./pool.js";

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC"
  );
  return rows;
}

async function insertMessage(userName, text) {
  await pool.query("INSERT INTO messages (user_name, text) VALUES ($1, $2)", [
    userName,
    text,
  ]);
}

// async function searchMessages(matcher) {
//   const { rows } = await pool.query(
//     "SELECT * FROM messages WHERE text ILIKE $1",
//     [`%${matcher}%`]
//   );
//   return rows;
// }

// async function deleteAllMessages() {
//   await pool.query("DELETE FROM messages");
// }

export { getAllMessages, insertMessage };
