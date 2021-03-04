import { Login } from "./views/Login/Login"
import { Landing } from "./views/Landing/Landing"
import { Register } from "./views/Register/Register"
import { Profile } from "./views/Profile/Profile"

/*
type Route :
    name: string,
    path: string,
    component?: React.AbstractComponent<any>,
    roles?: string[],
    routes?: Route[],
*/

// Liste des routes
const routes = [
    {
        'name': 'landing',
        'path': '/',
        'component': Landing,
    },
    {
        'name': 'login',
        'path': '/login',
        'component': Login,
    },
    {
        'name': 'register',
        'path': '/register',
        'component': Register,
    },
    {
        'name': 'profile',
        'path': '/profile',
        'component': Profile,
        'roles': ['ROLE_USER']
    },

]

// retourne un tableau de routes mis à plat 
const compile = function (parentRoute, subRoutes) {
    return subRoutes.flatMap(subRoute => {
        const newRoute = {
            'name': subRoute.name,
            'path': parentRoute.path + subRoute.path,
            'component': subRoute.component,
            'roles': (parentRoute.roles || []).concat((subRoute.roles || [])),
        };
        return (subRoute.routes) ? [...compile(newRoute, subRoute.routes)] : newRoute;
    });
}

const getRoutes = () => {
    const parentRoute = {
        'name': '',
        'path': '',
    };
    const flatRoutes = compile(parentRoute, routes);
    return flatRoutes;
}

const getPath = (name, params = null) => {
    const routeFound = getRoutes().find(route => route.name === name);
    let path = routeFound ? routeFound.path : null;
    if (path && params) {
        Object.entries(params).forEach(([key, value]) => {
            path = path ? path.replace(`:${key}`, value) : '';
        });
    }
    return path;
}

export {
    getRoutes,
    getPath
}