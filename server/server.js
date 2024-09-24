const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/authController");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);
app.use(bodyParser.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
