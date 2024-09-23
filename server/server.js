const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use("/api", apiRoutes); // Mount API routes

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
