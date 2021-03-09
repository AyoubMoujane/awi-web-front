import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from '../../services/security/isAuth'
import { hasRoles } from '../../services/security/hasRoles'
import { getPath } from '../../routes'

export function MyRoute ({component : Component, roles, path}) {

    
    return (
        <Route 
            path={path} 
            exact={true} 
            render = {(props) => 
                (roles.length === 0 || (isAuth()) && hasRoles(roles))? (
                <Component {...props} />
            ) : (
                isAuth() ? (
                    <Redirect to={{
                        pathname:getPath('profile')
                    }}/>
                ) : (
                    <Redirect to={{
                        pathname:getPath('login')
                    }}/>
                )
            )
            }
        />
    )
}