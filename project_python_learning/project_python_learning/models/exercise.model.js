import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";
import { Lesson } from "./lesson.model.js";
import { User } from "./user.model.js";

const answerTypes = ["Pole tekstowe", "Wielokrotny wybór" ];

const Exercise = sequelize.define("Exercise", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    lesson_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lesson,
            key: "id"
        }
    },
    question: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    code_example: {
        type: DataTypes.TEXT,
        allowNull: true // Przykładowy kod do zadania (może być null)
    },
    answer_type: {
        type: DataTypes.ENUM(...answerTypes),
        allowNull: false
    },
    correct_answer: {
        type: DataTypes.TEXT,
        allowNull: false // Poprawna odpowiedź
    },
    options: {
        type: DataTypes.JSON, // Lista możliwych odpowiedzi
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    }
});

export { Exercise, answerTypes };
