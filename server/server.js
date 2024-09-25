// import express from "express";
// import cors from "cors";

// import bodyParser from "body-parser";
import apiRoutes from "./routes/api.js";
// import dotenv from "dotenv";
// dotenv.config();
// // import fs from 'fs';
// import pg from 'pg';
// // import { URL } from 'url';

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

//

// const client = new pg.Client(config);
// client.connect(function (err) {
//     if (err)
//         throw err;
//     client.query("SELECT VERSION()", [], function (err, result) {
// 		console.log("hello");

//         if (err)
//             throw err;

//         console.log(result.rows[0].version);
//         client.end(function (err) {
//             if (err)
//                 throw err;
//         });
//     });
// });

// app.use("/api", apiRoutes);
// app.use(bodyParser.json());
// // app.use("/auth", authRoutes);

// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });
// server.js or index.js
import express from "express";
import cors from "cors";
import { sequelize } from "./config/db.js"; // Adjust the path as necessary
import User from "./models/User.js"; // Adjust the path as necessary
import { Company } from "./models/Company.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes)

// Sync database and models
sequelize.sync()
    .then(() => {
        console.log("Database & tables created!");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error creating database & tables: ", error);
    });
