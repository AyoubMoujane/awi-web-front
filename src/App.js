import React from 'react'
import { SideBar }  from './components/SideBar'
import { JeuForm }  from './components/Jeux/JeuForm'
import { FestivalForm } from './components/Festival/FestivalForm'

export default function App() {

  return (
    <div>
      <SideBar/>
      <JeuForm/>
      <FestivalForm/>
    </div>
  )
}
