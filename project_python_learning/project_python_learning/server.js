import express from "express";
import expressSession from "express-session";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { passport } from "./utility/auth.js";
import { authRole } from "./utility/aclauth.js";
import { usersController, lessonsController, exercisesController, studentProgressController, submissionsController } from "./controllers/controllers.js";
import {htmlHelper} from "./helpers/htmlHelper.js";
import {difficultyLevels,categories} from "./models/lesson.model.js";
import {answerTypes} from "./models/exercise.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.urlencoded({ extended: false }));

app.locals.htmlHelper = htmlHelper;
app.locals.lesson_difficulties = difficultyLevels;
app.locals.lesson_categories = categories;
app.locals.exercise_answer_types = answerTypes;

app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/lessons");
    }
    next();
};

const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(express.static("./public"));

// Auth routes
app.get("/register", checkLoggedIn, (req, res) => {
    res.render("pages/auth/register.ejs", { user: req.user });
});

app.post("/register", passport.authenticate("local-signup", {
    successRedirect: "/login?reg=success",
    failureRedirect: "/register?reg=failure"
}));

app.get("/login", checkLoggedIn, (req, res) => {
    res.render("pages/auth/login.ejs", { user: req.user });
});

app.post("/login", passport.authenticate("local-login"), (req, res) => {
    if (!req.user) {
        return res.redirect("/login?log=failure");
    }

    // Przekierowanie w zależności od roli użytkownika
    if (req.user.role === "teacher") {
        return res.redirect("/teacher");
    } else if (req.user.role === "admin") {
        return res.redirect("/admin");
    }

    // Domyślne przekierowanie dla studentów lub innych ról
    res.redirect("/lessons");
});

app.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
});

// Panel nauczyciela
app.get("/teacher", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "teacher") return res.redirect("/");
    res.render("pages/teacher/index.ejs", { user: req.user });
});

// Zarządzanie lekcjami przez nauczyciela
app.get("/teacher/lessons", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "teacher") return res.redirect("/");
    const lessons = await lessonsController.getLessonsByTeacher(req.user.id);
    res.render("pages/teacher/my_lessons.ejs", { user: req.user, lessons: lessons });
});

// Panel Nauczyciela - Moje ćwiczenia do oceny
app.get("/teacher/my_submissions", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "teacher") return res.redirect("/");

    // Pobranie submissions powiązanych z użytkownikiem
    const submissions = await submissionsController.getAll();

    res.render("pages/teacher/my_submissions.ejs", { user: req.user, submissions: submissions });
});

app.get("/lessons/add", checkAuthenticated, (req, res) => {
    if ((req.user.role !== "teacher") && (req.user.role !== "admin")) return res.redirect("/");
    res.render("pages/teacher/lesson_add.ejs", { user: req.user });
});

// Obsługa dodawania lekcji
app.post("/lessons/add", checkAuthenticated, async (req, res) => {
    if ((req.user.role !== "teacher") && (req.user.role !== "admin")) return res.redirect("/");
    await lessonsController.createLesson({ ...req.body }, req.user.id);
    res.redirect("/lessons");
});

// Widok edycji lekcji
app.get("/lessons/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");

    const lesson = await lessonsController.getById(req.params.id);
    if (!lesson) return res.redirect("/lessons");

    res.render("pages/teacher/lesson_edit.ejs", { user: req.user, lesson });
});

// Obsługa edycji lekcji
app.post("/lessons/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");

    await lessonsController.updateById(req.params.id, req.body);
    res.redirect("/lessons");
});

// Widok usuwania lekcji
app.get("/lessons/delete/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");

    const lesson = await lessonsController.getById(req.params.id);
    if (!lesson) return res.redirect("/lessons");

    res.render("pages/teacher/lesson_delete.ejs", { user: req.user, lesson });
});

// Obsługa usuwania lekcji
app.post("/lessons/delete/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");

    await lessonsController.deleteById(req.params.id);
    res.redirect("/lessons");
});

// Lessons routes
app.get("/lessons", checkAuthenticated, async (req, res) => {
    const lessons = await lessonsController.getAll();
    res.render("pages/lessons/index.ejs", { user: req.user, lessons: lessons });
});

app.get("/lessons/:id", checkAuthenticated, async (req, res) => {
    const lesson = await lessonsController.getById(req.params.id);
    if (!lesson) return res.status(404).send("Lekcja nie została znaleziona.");

    // Pobieramy ćwiczenia powiązane z tą lekcją
    const exercises = await exercisesController.getByLessonId(req.params.id);

    // Sprawdzenie, czy student już ukończył tę lekcję
    const alreadyCompleted = await studentProgressController.hasCompletedLesson(req.user.id, lesson.id);

    if (!alreadyCompleted) {
        await studentProgressController.markLessonAsCompleted(req.user.id, lesson.id);
    }


    res.render("pages/lessons/lesson_view.ejs", {
        user: req.user,
        lesson: lesson,
        exercises: exercises
    });
});


// Exercises routes
app.get("/exercises", checkAuthenticated, async (req, res) => {
    const exercises = await exercisesController.getAll();
    res.render("pages/exercises/index.ejs", { user: req.user, exercises: exercises });
});

// Widok dodawania nowego ćwiczenia
app.get("/exercises/add", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");

    // Pobranie listy lekcji, aby nauczyciel mógł przypisać zadanie do lekcji
    const lessons = await lessonsController.getAll();
    res.render("pages/teacher/exercise_add.ejs", { user: req.user, lessons });
});

// Obsługa dodawania ćwiczenia
app.post("/exercises/add", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");
    let exercise = req.body;
    try {
        if (exercise.answer_type === "Wielokrotny wybór") {
            exercise.options = Array.of(exercise.option1, exercise.option2, exercise.option3, exercise.option4);
            exercise.correct_answer = exercise[exercise.correctOption.toString()];
        }
        await exercisesController.createExercise(exercise, req.user.id);
        res.redirect("/exercises");
    } catch (error) {
        console.error("Błąd przy dodawaniu ćwiczenia:", error);
        res.status(500).redirect("/exercises");
    }
});

app.get("/exercises/:id", checkAuthenticated, async (req, res) => {
    const exercise = await exercisesController.getById(req.params.id);
    console.log("____________________________________________________________________");
    console.log(exercise.options);
    console.log("____________________________________________________________________");
    console.log(JSON.parse(exercise.options));
    res.render("pages/exercises/exercise_view.ejs", { user: req.user, exercise: exercise });
});

// Rozwiązywanie zadań, dostęp tylko student
app.get("/exercises/:id/submit", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "student") return res.redirect("/");

    const exercise = await exercisesController.getById(req.params.id);
    res.render("pages/exercises/exercise_submit.ejs", { user: req.user, exercise });
});

app.post("/exercises/:id/submit", checkAuthenticated, async (req, res) => {
    const submittedAnswer = req.body.submitted_answer;
    await submissionsController.submitAnswer(req.user.id, req.params.id, submittedAnswer);
    res.redirect("/student/my_submissions");
});

// Widok edycji zadania (tylko dla nauczycieli)
app.get("/exercises/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");

    const exercise = await exercisesController.getById(req.params.id);
    if (!exercise) return res.redirect("/exercises");

    const lessons = await lessonsController.getAll(); // Pobranie listy lekcji
    res.render("pages/teacher/exercise_edit.ejs", { user: req.user, exercise, lessons });
});

// Obsługa edycji zadania
app.post("/exercises/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");

    try {
        let exercise = req.body;
        if (exercise.answer_type === "Wielokrotny wybór") {
            exercise.options = Array.of(exercise.option1, exercise.option2, exercise.option3, exercise.option4);
            exercise.correct_answer = exercise[exercise.correctOption.toString()];
        }
        await exercisesController.updateById(req.params.id, exercise);
        res.redirect("/exercises"); // Po edycji przekierowanie na stronę zadań
    } catch (error) {
        console.error(error);
        res.redirect(`/exercises/edit/${req.params.id}`); // W razie błędu wracamy do formularza
    }
});

// Widok usuwania zadania (tylko dla nauczycieli)
app.get("/exercises/delete/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");

    const exercise = await exercisesController.getById(req.params.id);
    if (!exercise) return res.redirect("/exercises");

    res.render("pages/teacher/exercise_delete.ejs", { user: req.user, exercise });
});

// Obsługa usuwania zadania
app.post("/exercises/delete/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role === "student") return res.redirect("/");

    try {
        await exercisesController.deleteById(req.params.id);
        res.redirect("/exercises"); // Po usunięciu przekierowanie na stronę zadań
    } catch (error) {
        console.error(error);
        res.redirect("/exercises"); // W razie błędu wracamy do listy
    }
});
// Ćwiczenia ocenianie przez nauczyciela
app.get("/teacher/submissions/:id/grade", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "teacher") return res.redirect("/");
    const submission = await submissionsController.getById(req.params.id);
    res.render("pages/teacher/submission_grade.ejs", { user: req.user, submission });
});

app.post("/teacher/submissions/:id/grade", checkAuthenticated, async (req, res) => {
    await submissionsController.gradeSubmission(req.params.id, req.body.points, req.user.id);
    res.redirect("/teacher/my_submissions");
});

// Panel główny studenta (Dashboard)
app.get("/student", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "student") return res.redirect("/");
    const progress = await studentProgressController.getByStudentId(req.user.id);
    res.render("pages/student/index.ejs", { user: req.user, progress });
});

// Panel Studenta - Moje rozwiązane ćwiczenia
app.get("/student/my_submissions", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "student") return res.redirect("/");

    // Pobranie submissions powiązanych z użytkownikiem
    const submissions = await submissionsController.getByStudentId(req.user.id);

    res.render("pages/student/my_submissions.ejs", { user: req.user, submissions: submissions });
});

 /* // Student progress
 app.get("/student/progress", checkAuthenticated, async (req, res) => {
     const progress = await studentProgressController.getByStudentId(req.user.id);
    res.render("pages/student/my_lessons.ejs", { user: req.user, progress: progress });
 }); */

app.get("/student/progress", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "student") return res.redirect("/");

    const completedLessons = await studentProgressController.getByStudentId(req.user.id);
    const submissions = await submissionsController.getByStudentId(req.user.id);

    // Liczenie ukończonych lekcji i rozwiązanych ćwiczeń
    const completedLessonsCount = completedLessons.length;
    const completedExercisesCount = submissions.length;

    // Liczenie sumy zdobytych punktów i maksymalnej możliwej liczby punktów
    const totalPoints = submissions.reduce((sum, s) => sum + (s.points || 0), 0);
    const maxPoints = submissions.length * 10; // Zakładamy, że każde ćwiczenie jest na max 10 pkt

    res.render("pages/student/my_progress.ejs", {
        user: req.user,
        completedLessonsCount,
        completedExercisesCount,
        totalPoints,
        maxPoints
    });
});


app.get("/lessons/:id", checkAuthenticated, async (req, res) => {
    const lesson = await lessonsController.getById(req.params.id);
    if (!lesson) return res.status(404).send("Lekcja nie została znaleziona.");

    // Oznaczenie lekcji jako ukończonej
    if (req.user.role === "student") {
        await studentProgressController.markLessonAsCompleted(req.user.id, req.params.id);
    }

    const exercises = await exercisesController.getByLessonId(req.params.id);

    res.render("pages/lessons/lesson_view.ejs", {
        user: req.user,
        lesson: lesson,
        exercises: exercises
    });
});


// Admin Panel
app.get("/admin", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    res.render("pages/admin/index.ejs", { user: req.user });
});

// Admin Zarządzanie użytkownikami
app.get("/admin/users", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    const users = await usersController.getAll();
    res.render("pages/admin/manage_users.ejs", { user: req.user, users });
});

// Widok dodawania użytkownika
app.get("/admin/users/add", checkAuthenticated, (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    res.render("pages/admin/user_add.ejs", { user: req.user });
});

// Obsługa dodawania użytkownika
app.post("/admin/users/add", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");

    try {
        await usersController.createUser(req.body);
        res.redirect("/admin/users");
    } catch (error) {
        console.error("Błąd dodawania użytkownika:", error);
        res.redirect("/admin/users/add");
    }
});

// Widok edycji użytkownika
app.get("/admin/users/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");

    const userToEdit = await usersController.getById(req.params.id);
    if (!userToEdit) return res.redirect("/admin/users");

    res.render("pages/admin/user_edit.ejs", { user: req.user, userToEdit });
});

// Obsługa edycji użytkownika
app.post("/admin/users/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");

    try {
        await usersController.updateById(req.params.id, req.body);
        res.redirect("/admin/users");
    } catch (error) {
        console.error("Błąd edycji użytkownika:", error);
        res.redirect(`/admin/users/edit/${req.params.id}`);
    }
});

app.post("/admin/users/delete/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    await usersController.deleteById(req.params.id);
    res.redirect("/admin/users");
});

// Admin Zarządzanie lekcjami
app.get("/admin/lessons", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    const lessons = await lessonsController.getAll();
    res.render("pages/admin/manage_lessons.ejs", { user: req.user, lessons });
});


app.get("/admin/lessons/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    const lesson = await lessonsController.getById(req.params.id);
    res.render("pages/admin/lesson_edit.ejs", { user: req.user, lesson });
});

app.post("/admin/lessons/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    await lessonsController.updateById(req.params.id, req.body);
    res.redirect("/admin/lessons");
});

app.post("/admin/lessons/delete/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    await lessonsController.deleteById(req.params.id);
    res.redirect("/admin/lessons");
});

// Admin Zarządzanie zadaniami
app.get("/admin/exercises", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    const exercises = await exercisesController.getAll();
    res.render("pages/admin/manage_exercises.ejs", { user: req.user, exercises });
});

app.get("/admin/exercises/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    const exercise = await exercisesController.getById(req.params.id);
    res.render("pages/admin/exercise_edit.ejs", { user: req.user, exercise });
});

app.post("/admin/exercises/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    await exercisesController.updateById(req.params.id, req.body);
    res.redirect("/admin/exercises");
});

app.post("/admin/exercises/delete/:id", checkAuthenticated, async (req, res) => {
    if (req.user.role !== "admin") return res.redirect("/");
    await exercisesController.deleteById(req.params.id);
    res.redirect("/admin/exercises");
});


// Home
app.get("/", (req, res) => {
    res.render("pages/home/index.ejs", { user: req.user });
});

app.listen(3010, () => {
    console.log("Server started at port 3010");
});
