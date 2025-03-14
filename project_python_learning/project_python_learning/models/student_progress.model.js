import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";
import { Lesson } from "./lesson.model.js";

const StudentProgress = sequelize.define("StudentProgress", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    lesson_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lesson,
            key: "id"
        }
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Progres w %
        validate: { min: 0, max: 100 }
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // Czy lekcja została ukończona
    }
});

export { StudentProgress };
