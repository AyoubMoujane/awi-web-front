export function hasRoles(roles) {
    const userRoles = ["ROLE_USER", "ROLE_MODERATOR"]
    return roles.every(role => userRoles.includes(role))
}