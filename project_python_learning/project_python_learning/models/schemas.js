import { sequelize } from "../utility/db.js";
import { User } from "./user.model.js";
import { Lesson } from "./lesson.model.js";
import { Exercise } from "./exercise.model.js";
import { StudentProgress } from "./student_progress.model.js";
import { Submissions } from "./submissions.model.js";

/***  relacje Lesson   ***/
// Nauczyciel tworzy wiele lekcji
User.hasMany(Lesson, {
    foreignKey: "created_by"
});
Lesson.belongsTo(User, {
    foreignKey: "created_by"
});

/***  relacje Exercise   ***/
// Lekcja ma wiele ćwiczeń
Lesson.hasMany(Exercise, {
    foreignKey: "lesson_id"
});
Exercise.belongsTo(Lesson, {
    foreignKey: "lesson_id"
});

// Nauczyciel tworzy wiele ćwiczeń
User.hasMany(Exercise, {
    foreignKey: "created_by"
});
Exercise.belongsTo(User, {
    foreignKey: "created_by"
});

/***  relacje StudentProgress   ***/
// Uczeń ma postęp w wielu lekcjach
User.hasMany(StudentProgress, {
    foreignKey: "student_id"
});
StudentProgress.belongsTo(User, {
    foreignKey: "student_id"
});

Lesson.hasMany(StudentProgress, {
    foreignKey: "lesson_id"
});
StudentProgress.belongsTo(Lesson, {
    foreignKey: "lesson_id"
});

/***  relacje Submissions   ***/
// Uczeń może składać wiele rozwiązań
User.hasMany(Submissions, {
    foreignKey: "student_id"
});
Submissions.belongsTo(User, {
    foreignKey: "student_id"
});

// Ćwiczenie może mieć wiele rozwiązań
Exercise.hasMany(Submissions, {
    foreignKey: "exercise_id"
});
Submissions.belongsTo(Exercise, {
    foreignKey: "exercise_id"
});

// Nauczyciel ocenia rozwiązania
User.hasMany(Submissions, {
    foreignKey: "graded_by"
});
Submissions.belongsTo(User, {
    foreignKey: "graded_by"
});

//await sequelize.sync({ force: true });

export { User, Lesson, Exercise, StudentProgress, Submissions };
