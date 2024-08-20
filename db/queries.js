const pool = require("./pool");

exports.insertUser = async (first_name, last_name, username, password) => {
    await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)',
                    [first_name, last_name, username, password]
    );
}

