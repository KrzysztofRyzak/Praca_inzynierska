import { Lesson, User } from "../models/schemas.js";

export class LessonsController {
    async getAll() {
        return await Lesson.findAll({});
    }

    async getById(id) {
        return await Lesson.findByPk(id);
    }

    async getByDifficulty(difficulty) {
        return await Lesson.findAll({
            where: {
                difficulty
            }
        });
    }

    async createLesson(lessonData, teacherId) {
        const teacher = await User.findByPk(teacherId);
        if (!teacher || teacher.role === "student") {
            throw new Error("Invalid user role");
        }
        lessonData.created_by = teacherId;
        return await Lesson.create(lessonData);
    }

    async updateById(id, lessonData) {
        const updatedLesson = await Lesson.update(lessonData, {
            where: {
                id
            }
        });
        return updatedLesson;
    }

    async deleteById(id) {
        return await Lesson.destroy({
            where: {
                id
            }
        });
    }
}
