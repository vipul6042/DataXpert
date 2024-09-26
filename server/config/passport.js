import passport from "passport";
import User from "../models/User.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:4000/api/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Check if user exists in the database
				let user = await User.findOne({
					where: { email: profile.emails[0].value },
				});

				// If not, create a new user
				if (!user) {
					user = await User.create({
						username: profile.displayName,
						email: profile.emails[0].value,
						password_hash: "123456",
					});
				}

				done(null, user);
			} catch (error) {
				done(error, null);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByPk(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});


export default passport;
