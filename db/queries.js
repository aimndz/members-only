const pool = require("./pool");

exports.insertUser = async (first_name, last_name, username, password) => {
    await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)',
                    [first_name, last_name, username, password]
    );
}

exports.insertMessage = async (user_id, title, text) => {
    await pool.query('INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)',
                    [user_id, title, text]
    );
}

exports.updateMemberStatus = async (user_id, newStatus) => {
    await pool.query('UPDATE users SET mem_status = $1 WHERE id = $2',
                    [newStatus, user_id,]
    );
}