import { permissions } from "./permissions.js";

function getGuestDefaultUser() {
    return {
        role: "student"
    };
}

function authRole(req, res, next) {
    console.log("authRole() - middleware");
    const resource = req.route.path;
    const method = req.method.toLowerCase();
    console.log("resource:", resource, "method:", method);

    if (!req.user) {
        req.user = getGuestDefaultUser();
    }

    console.log("req.user", req.user);

    if (permissions.isResourceAllowedForUser(req.user.role, resource, method)) {
        return next();
    } else {
        res.status(401);
        return res.send("Access forbidden");
    }
}

export {
    authRole
};
