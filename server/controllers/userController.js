import pool from "../config/db";

exports.getUsers = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM users");
		res.json(result.rows);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

exports.createUser = async (req, res) => {
	const { name, email } = req.body;
	try {
		const result = await pool.query(
			"INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
			[name, email],
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		res.status(500).send(error.message);
	}
};
