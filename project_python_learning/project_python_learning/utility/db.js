import { Sequelize } from "sequelize";

const sequelize = new Sequelize("python_learning_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
    decimalNumbers: true
});

sequelize.authenticate()
    .then(() => {
        console.log("Connected to the Python Learning database successfully.");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

export { sequelize };
