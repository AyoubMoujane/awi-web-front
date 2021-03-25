import { Login } from "./views/Login/Login"
import { Landing } from "./views/Landing/Landing"
import { Register } from "./views/Register/Register"
import { Profile } from "./views/Profile/Profile"
import { AdminHome } from "./views/Home/Admin/AdminHome"
import { Festivals } from "./views/Festival/Festivals"
import { ParticipantsView } from "./views/Participant/ParticipantsView"
import { ZonesView } from "./views/Zone/ZonesView"
import { OrganisatorView } from "./views/Organisateur/OrganisatorView"
import { SuiviExposantView } from "./views/Participant/SuiviExposantView"
// import Jeu from "./views/Jeux/Jeu"
import Jeu from "./views/Jeux/Jeu"
// import Zone from "./views/Zone/Zone"



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
    {
        'name': 'home',
        'path': '/home',
        'component': AdminHome,
        'roles': ['ROLE_ADMIN']
    },
    {
        'name': 'festivals',
        'path': '/festivals',
        'component': Festivals,
        'roles': ['ROLE_ADMIN']
    },
    {

        'name': 'participants',
        'path': '/participants',
        'component': ParticipantsView,
        'roles': ['ROLE_ADMIN','ROLE_ORGANISATOR']
    },
    {

        'name': 'jeux',
        'path': '/jeux',
        'component': Jeu,
        'roles': ['ROLE_ADMIN']
    },
    {
        'name': 'zones',
        'path': '/zones',
        'component': ZonesView,
        'roles': ['ROLE_ADMIN']
    },
    {
        'name': 'organisateurs',
        'path': '/organisateurs',
        'component': OrganisatorView,
        'roles': ['ROLE_ADMIN']
    },
    {
        'name': 'suiviExposant',
        'path': '/suiviExposant',
        'component': SuiviExposantView,
        'roles': ['ROLE_ADMIN']
    }
   

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