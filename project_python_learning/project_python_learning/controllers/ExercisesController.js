import { Exercise, Lesson, User, Submissions } from "../models/schemas.js";

export class ExercisesController {
    async getAll() {
        return await Exercise.findAll({});
    }

    async getById(id) {
        let exercise = await Exercise.findByPk(id);
        if (exercise.answer_type === "Wielokrotny wybór") {
            console.log(exercise.options);
            
            let optionsJson = JSON.parse(JSON.parse(exercise.options));
            console.log(optionsJson);
            console.log(optionsJson[0]);
            exercise.option1 = optionsJson[0];
            exercise.option2 = optionsJson[1];
            exercise.option3 = optionsJson[2];
            exercise.option4 = optionsJson[3];

            exercise.correctOption = `option${optionsJson.indexOf(exercise.correct_answer)+1}`
        }
        return exercise;
    }

    async getByLessonId(lessonId) {
        return await Exercise.findAll({
            where: {
                lesson_id: lessonId
            }
        });
    }

    async createExercise(exerciseData, teacherId) {
        const teacher = await User.findByPk(teacherId);
        if (!teacher || teacher.role === "student") {
            throw new Error("Invalid user role");
        }

        const lesson = await Lesson.findByPk(exerciseData.lesson_id);
        if (!lesson) {
            throw new Error("Invalid lesson ID");
        }

        // Jeśli zadanie to quiz, upewniamy się, że opcje są przekazane i są tablicą
        if (exerciseData.answer_type === "Wielokrotny wybór") {
            if (!exerciseData.options || !Array.isArray(exerciseData.options) ) {
                throw new Error("Quiz must have multiple choice options");
            }
            if (exerciseData.options.length !== 4) {
                throw new Error(`Exercise quiz must have exactly 4 answer options defined. Provided ${exerciseData.options.length}`);
            }
            exerciseData.options = JSON.stringify(exerciseData.options); // Konwersja do JSON
        } else {
            exerciseData.options = null;
        }

        exerciseData.created_by = teacherId;
        return Exercise.create(exerciseData);
    }

    async updateById(id, exerciseData) {
        if (exerciseData.answer_type === "Wielokrotny wybór" && exerciseData.options) {
            exerciseData.options = JSON.stringify(exerciseData.options);
        }

        const updatedExercise = await Exercise.update(exerciseData, {
            where: {
                id
            }
        });
        return updatedExercise;
    }

    async deleteById(id) {
        return await Exercise.destroy({
            where: {
                id
            }
        });
    }

    async submitAnswer(studentId, exerciseId, submittedAnswer) {
        const exercise = await Exercise.findByPk(exerciseId);
        if (!exercise) return null;

        let points = null;

        if (exercise.answer_type === "Pole tekstowe") {
            // Wpisywana odpowiedź – nauczyciel ocenia później
            points = null;
        } else if (exercise.answer_type === "Wielokrotny wybór") {
            // Quiz – sprawdzamy od razu
            points = exercise.correct_answer === submittedAnswer ? 10 : 0;
        }

        return await Submissions.create({
            exercise_id: exerciseId,
            student_id: studentId,
            submitted_answer: submittedAnswer,
            points,
            graded_by: points !== null ? "System" : null
        });
    }
}
