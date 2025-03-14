import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";
import { Exercise } from "./exercise.model.js";

const Submissions = sequelize.define("Submissions", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Exercise,
            key: "id"
        }
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    submitted_answer: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    graded_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: "id"
        }
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: true,  // Może być null, jeśli nauczyciel jeszcze nie ocenił
        validate: { min: 0, max: 10 }
    }
});

export { Submissions };
