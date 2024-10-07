// import pool from "../config/db";
import { History } from "../models/associations.js";


// exports.getUsers = async (req, res) => {
// 	try {
// 		const result = await pool.query("SELECT * FROM users");
// 		res.json(result.rows);
// 	} catch (error) {
// 		res.status(500).send(error.message);
// 	}
// };

// exports.createUser = async (req, res) => {
// 	const { name, email } = req.body;
// 	try {
// 		const result = await pool.query(
// 			"INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
// 			[name, email],
// 		);
// 		res.status(201).json(result.rows[0]);
// 	} catch (error) {
// 		res.status(500).send(error.message);
// 	}
// };

export const getUserHistory = async (req, res) => {
	try {
		const { user_id } = req.query;

		if (!user_id) {
			return res
				.status(400)
				.json({ status: "error", message: "user_id is required" });
		}

		const user_id_num = Number.parseInt(user_id);

		if (Number.isNaN(user_id_num)) {
			return res.status(400).json({ error: "Invalid user_id parameter" });
		}

		const userHistory = await History.findAll({
			where: { user_id: user_id_num },
			order: [["createdAt", "DESC"]],
		});

		if (userHistory.length === 0) {
			return res
				.status(404)
				.json({ status: "error", message: "No history found for this user" });
		}

		res.json({
			status: "success",
			history: userHistory,
		});
	} catch (error) {
		console.error("Error fetching user history:", error);
		res.status(500).json({ status: "error", message: "Internal server error" });
	}
};
