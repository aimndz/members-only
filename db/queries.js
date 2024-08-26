const pool = require("./pool");

exports.insertUser = async (first_name, last_name, username, password) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, username, password]
  );
};

exports.insertMessage = async (user_id, title, text) => {
  await pool.query(
    "INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)",
    [user_id, title, text]
  );
};

exports.updateMemberStatus = async (user_id, newStatus) => {
  await pool.query("UPDATE users SET mem_status = $1 WHERE id = $2", [
    newStatus,
    user_id,
  ]);
};

exports.getAllMessages = async () => {
  const { rows } = await pool.query(`
    SELECT m.id, u.username, m.title, m.text, m.created_at
    FROM messages m
    LEFT JOIN users u
    ON m.user_id = u.id
    `);

  return rows;
};

exports.getMessageById = async (message_id) => {
  const { rows } = await pool.query(
    `
    SELECT m.id, u.username, m.title, m.text, m.created_at
    FROM messages m
    LEFT JOIN users u
    ON m.user_id = u.id
    WHERE m.id = $1
    `,
    [message_id]
  );

  return rows;
};

exports.deleteMessageById = async (message_id) => {
  await pool.query(`DELETE FROM messages WHERE id = $1`, [message_id]);
};

exports.getUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows;
};
