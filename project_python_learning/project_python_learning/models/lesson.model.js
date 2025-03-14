import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const difficultyLevels = ["Początkujący", "Średniozaawansowany", "Zaawansowany"];
const categories = ["Python Tutorial", "Obsługa Plików", "Python Moduły"];

const Lesson = sequelize.define("Lesson", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
    },
    title: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: { len: [1, 128] }
    },
    category: {
        type: DataTypes.ENUM(...categories),
        defaultValue: "Python Tutorial",
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false // Treść lekcji, może zawierać kod, teorię itp.
    },
    difficulty: {
        type: DataTypes.ENUM(...difficultyLevels),
        allowNull: false
    }
});

export { Lesson, difficultyLevels, categories };
