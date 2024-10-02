import { Company } from "../models/Company.js";
import { sequelize } from "../config/db.js";
import { Op } from "sequelize";
export const compute = async (req, res) => {
	const { code } = req.params;
	console.log(code);

	try {
		// Fetch all companies with the specified country code
		const companies = await Company.findAll({
			where: {
				country_code: code,
			},
		});

		if (companies.length === 0) {
			return res
				.status(404)
				.json({ message: "No companies found for this country code" });
		}

		res.json(companies);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const search= async (req, res) => {
	const { query } = req.query;
	if(query.length<1)return;
    try {
        const companies = await Company.findAll({
            where: {
                company: {
                    [Op.iLike]: `%${query}%`, // Using Op.iLike for case-insensitive search
                },
            },
        });
        res.json(companies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// router.get("/country/:code", async (req, res) => {
// 	const { code } = req.params;

// 	try {
// 		// Fetch all companies with the specified country code
// 		const companies = await Company.findAll({
// 			where: {
// 				countryCode: code,
// 			},
// 		});

// 		if (companies.length === 0) {
// 			return res
// 				.status(404)
// 				.json({ message: "No companies found for this country code" });
// 		}

// 		res.json(companies);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// });