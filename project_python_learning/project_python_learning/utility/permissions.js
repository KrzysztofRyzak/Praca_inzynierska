const usersRoles = [
    {
        role: "admin",
        priority: 4,
        allows: [
            { resource: "/admin", permissions: "*" },
            { resource: "/lessons", permissions: "*" },
            { resource: "/exercises", permissions: "*" },
            { resource: "/users", permissions: "*" }
        ]
    },
    {
        role: "teacher",
        priority: 3,
        allows: [
            { resource: "/teacher", permissions: "*" },
            { resource: "/lessons", permissions: "*" },
            { resource: "/exercises", permissions: "*" },
            { resource: "/submissions", permissions: "*" }
        ]
    },
    {
        role: "student",
        priority: 2,
        allows: [
            { resource: "/student", permissions: ["get", "post"] },
            { resource: "/lessons", permissions: ["get"] },
            { resource: "/exercises", permissions: ["get", "post"] },
            { resource: "/submissions", permissions: ["get", "post"] }
        ]
    },
    {
        priority: 1,
        role: "guest",
        allows: []
    }
];

const permissions = {
    usersRoles: usersRoles,
    addRoleParents: function(targetRole, sourceRole) {
        const targetData = this.usersRoles.find(v => v.role === targetRole);
        const sourceData = this.usersRoles.find(v => v.role === sourceRole);

        if (targetData && sourceData) {
            targetData.allows = targetData.allows.concat(sourceData.allows);
        }
    },
    isResourceAllowedForUser: function(userRole, resource, method) {
        const roleData = this.usersRoles.find(v => v.role === userRole);
        if (!roleData) return false;

        const resourceData = roleData.allows.find(v => v.resource === resource);
        if (!resourceData) return false;
        if (!resourceData.permissions) return false;

        if (!Array.isArray(resourceData.permissions)) {
            if (resourceData.permissions === "*") return true;
            if (resourceData.permissions === method) return true;
        } else {
            if (resourceData.permissions.includes("*")) return true;
            if (resourceData.permissions.includes(method)) return true;
        }

        return false;
    },
    getPriorityByRole: function(role) {
        const user = this.usersRoles.find(v => v.role === role);
        return user ? user.priority : -1;
    }
};

permissions.addRoleParents("teacher", "student");
permissions.addRoleParents("admin", "teacher");

export { permissions };
