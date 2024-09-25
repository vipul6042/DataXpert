import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import apiRoutes from "./routes/api.js";
// import authRoutes from "./routes/authController.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use("/api", apiRoutes);
app.use(bodyParser.json());
// app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
