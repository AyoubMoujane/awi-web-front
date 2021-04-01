import React, {useEffect} from 'react'
import { SideBar }  from './components/SideBar'

import { useDispatch } from 'react-redux'
import { fetchFestivals } from "./redux/actions/festival/festivalActions"

export default function App() {

  const dispatch = useDispatch()
  useEffect(() => dispatch(fetchFestivals()), [])

  return (
    <div>
      <SideBar/>
    </div>
  )
}
