import { Company } from "../models/Company.js";

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