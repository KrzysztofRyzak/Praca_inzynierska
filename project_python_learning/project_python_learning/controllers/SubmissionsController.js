import { Submissions, User, Exercise } from "../models/schemas.js";


export class SubmissionsController {
    async getAll() {
        return await Submissions.findAll({
            include: { all: true, nested: true }
        });
    }

    async getById(id) {
        return await Submissions.findByPk(id,
            {
                include: { all: true, nested: true }
            });
    }

    async getByStudentId(studentId) {
        return await Submissions.findAll({
            where: {
                student_id: studentId
            },
            include: { all: true, nested: true }
        });
    }

    async getByExerciseId(exerciseId) {
        return await Submissions.findAll({
            where: {
                exercise_id: exerciseId
            }
        });
    }

    async submitAnswer(studentId, exerciseId, submittedAnswer) {
        const exercise = await Exercise.findByPk(exerciseId);
        if (!exercise) {
            throw new Error("Invalid exercise ID");
        }

        let points = null;

        if (exercise.answer_type === "Wielokrotny wybór") {
            // Sprawdzamy, odpowiedź od razu dla quizów
            const isCorrect = submittedAnswer === exercise.correct_answer;
            points = isCorrect ? 10 : 0;
        }
        // dla klasycznych odpowiedzi tekstowych nie robimy nic, bo musi je sprawdzić nauczyciel
        return await Submissions.create({
            exercise_id: exerciseId,
            student_id: studentId,
            submitted_answer: submittedAnswer,
            points
        });
    }

    async gradeSubmission(submissionId, points, teacherId) {
        const teacher = await User.findByPk(teacherId);
        if (!teacher || teacher.role !== "teacher") {
            throw new Error("Invalid teacher ID");
        }

        const submission = await Submissions.findByPk(submissionId);
        if (!submission) {
            throw new Error("Invalid submission ID");
        }

        if (points < 0 || points > 10) {
            throw new Error("Points must be between 0 and 10");
        }

        submission.points = points;
        submission.graded_by = teacherId;
        await submission.save();

        return submission;
    }
}
