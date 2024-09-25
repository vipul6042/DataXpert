import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres', // or 'mysql', 'sqlite', etc.
    port:process.env.DB_PORT||11078,
    dialectOptions: {
        ssl: {
            require: true,        // Enable SSL
            rejectUnauthorized: false, // Depending on your setup, this might need to be true
        },
    },
});

export { sequelize };
