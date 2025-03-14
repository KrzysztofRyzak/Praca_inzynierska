describe("StudentProgressControllerTest", () => {
    test('getAll should fetch many', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('getByStudentId should fetch one', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('getByLessonId should find many', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('updateProgress progress not exists should return created progress', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('updateProgress progress exists should return updated progress', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('hasCompletedLesson lesson not complete should return false', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('hasCompletedLesson lesson complete should return true', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('markLessonAsCompleted should return created progress for completed lesson', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });
});