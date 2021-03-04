import AuthService from "../authentification/auth"

export function isAuth(){
    const currentUser = AuthService.getCurrentUser()
    if (currentUser !== null) {
        return true
    }
    else {
        return false
    }
}