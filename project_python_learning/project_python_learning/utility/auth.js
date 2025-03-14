import passport from "passport";
import LocalStrategy from "passport-local";
import { usersController } from "../controllers/controllers.js";

passport.serializeUser((user, done) => {
    console.log("serializeUser(), user.id:", user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const userDb = await usersController.getById(id);
        console.log("deserializeUser(), userDb:", userDb);
        done(null, userDb);
    } catch (err) {
        done(err);
    }
});

passport.use(
    "local-signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const userExists = await usersController.getUserByEmail(email);
                if (userExists) {
                    return done(null, false);
                }

                const userDb = await usersController.createUser({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: email,
                    password: password,
                    role: req.body.role
                });
                console.log(userDb);
                return done(null, userDb);
            } catch (err) {
                done(err);
            }
        }
    )
);

const authUser = async (req, email, password, done) => {
    try {
        const authenticatedUser = await usersController.getUserByEmail(email);
        if (!authenticatedUser) {
            return done(null, false);
        }

        const isValidPassword = await usersController.validPassword(password, authenticatedUser);
        if (!isValidPassword) {
            return done(null, false);
        }

        return done(null, authenticatedUser);
    } catch (err) {
        return done(err);
    }
};

passport.use(
    "local-login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        authUser
    )
);

export { passport };