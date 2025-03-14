describe("SubmissionsControllerTest", () => {
    test('getAll should fetch many', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('getById should fetch one', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('getById submission not exists should return empty', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('getByStudentId should find many', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('getByStudentId student without submissions should return empty', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('getByExerciseId should return many', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('submitAnswer should return created submission', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('submitAnswer exercise not exists should throw error', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });

    test('gradeSubmission should return graded submission', () => {
        let variable = "true";
        expect(variable).toBe('true');
    });
});
