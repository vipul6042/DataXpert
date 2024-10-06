
import User from "./User.js";
import History from "./History.js";


User.hasMany(History, {
	foreignKey: "user_id",
	as: "histories",
});

History.belongsTo(User, {
	foreignKey: "user_id",
	as: "user",
});

export { User, History };
