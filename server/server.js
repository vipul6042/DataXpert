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
import passport from "./config/passport.js";
// import cookieSession from "cookie-session";
import session from "express-session";

// const GoogleStrategy = require("passport-google-oauth20").Strategy;
import GoogleStrategy from "passport-google-oauth20";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
	session({
		secret: "ekdoteenmkc", // Replace with a strong secret key
		resave: false, // Prevents session from being saved back to the store if it wasn't modified
		saveUninitialized: false, // Prevents uninitialized sessions from being saved
		cookie: { secure: false }, // Set to true if using HTTPS
	}),
);
app.use(passport.initialize());
app.use(passport.session());

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			callbackURL: "http://localhost:4000/auth/google/callback",
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			// User find or create logic here
// 			done(null, profile);
// 		},
// 	),
// );

// passport.serializeUser((user, done) => {
// 	done(null, user);
// });

// passport.deserializeUser((user, done) => {
// 	done(null, user);
// });

app.use("/api", apiRoutes);

// app.use(
// 	cookieSession({
// 		name: "google-auth-session",
// 		keys: ["key1", "key2"],
// 	}),
// );

app.get("/", (req, res) => {
	res.send("<button><a href='/api/google'>Login With Google</a></button>");
});

// Sync database and models
sequelize
	.sync()
	.then(() => {
		console.log("Database & tables created!");
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error creating database & tables: ", error);
	});
