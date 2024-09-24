const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

passport.use(
	new GoogleStrategy(
		{
			clientID: "your_google_client_id",
			clientSecret: "your_google_client_secret",
			callbackURL: "/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Check if user exists in the database
				let user = await User.findOne({ where: { googleId: profile.id } });

				// If not, create a new user
				if (!user) {
					user = await User.create({
						username: profile.displayName,
						email: profile.emails[0].value,
						googleId: profile.id,
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
