export function hasRoles(roles) {
    const userRoles = ["ROLE_USER", "ROLE_ADMIN", "ROLE_ORGANISATOR", "ROLE_VISITOR"]
    return roles.every(role => userRoles.includes(role))
}