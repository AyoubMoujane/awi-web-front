import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AuthService from "./services/authentification/auth"
import SideBar from './components/SideBar'
import JeuForm from './components/Jeux/JeuForm'


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: null
    }
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const currentUser = this.state.currentUser

    return (
      <div>
      <SideBar></SideBar>
      <JeuForm></JeuForm>
      </div>
    )
  }
}
