import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const rolesArr = ["admin", "teacher", "student"];

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false, 
        validate: { len: [1, 32] }
    },
    surname: {
        type: DataTypes.STRING(64),
        allowNull: false, 
        validate: { len: [1, 64] }
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false, 
        unique: true,
        validate: { isEmail: true, len: [1, 128] }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: { 
            notNull: { msg: "Password is required" },
            notEmpty: { msg: "Password cannot be empty" }
        }
    },
    role: {
        type: DataTypes.ENUM(...rolesArr),
        defaultValue: "student",
        allowNull: false
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,  // Procent ukończenia kursu (0-100%)
        validate: { min: 0, max: 100 }
    }
});

export { User, rolesArr };
