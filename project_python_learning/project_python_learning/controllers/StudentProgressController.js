import { StudentProgress, User, Lesson } from "../models/schemas.js";


export class StudentProgressController {
    async getAll() {
        return await StudentProgress.findAll({});
    }

    async getByStudentId(studentId) {
        return await StudentProgress.findAll({
            where: {
                student_id: studentId
            }
        });
    }

    async getByLessonId(lessonId) {
        return await StudentProgress.findAll({
            where: {
                lesson_id: lessonId
            }
        });
    }

    async updateProgress(studentId, lessonId, progress) {
        const student = await User.findByPk(studentId);
        if (!student || student.role !== "student") {
            throw new Error("Invalid student ID");
        }
        
        const lesson = await Lesson.findByPk(lessonId);
        if (!lesson) {
            throw new Error("Invalid lesson ID");
        }
        
        const [record, created] = await StudentProgress.findOrCreate({
            where: { student_id: studentId, lesson_id: lessonId },
            defaults: { progress, completed: progress === 100 }
        });
        
        if (!created) {
            record.progress = progress;
            record.completed = progress === 100;
            await record.save();
        }
        
        return record;
    }

    async hasCompletedLesson(studentId, lessonId) {
        // Sprawdzamy, czy student ukończył już tę lekcję
        const existingProgress = await StudentProgress.findOne({
            where: {
                student_id: studentId,
                lesson_id: lessonId
            }
        });
        return existingProgress !== null; // Jeśli istnieje, zwracamy true
    }

    async markLessonAsCompleted(studentId, lessonId) {
        // Dodajemy progres, jeśli jeszcze nie został dodany
        return await StudentProgress.create({
            student_id: studentId,
            lesson_id: lessonId
        });
    }
    
}
