import { View, Text, Button } from 'react-native'
import TextSelector from './components/Principal'
import { useState } from 'react'
import LogIn from './components/LogIn'
import Welcome from './components/Welcome'
import Registration from './components/Registation'
export default function App() {

  const [navigation, setNavigation] = useState("Welcome")
  return (
    <>
      {navigation === "Welcome" && <Welcome setNavigation={setNavigation} />}
      {navigation === "Login" && <LogIn setNavigation ={setNavigation}></LogIn>}
      {navigation === "Home" && <TextSelector setNavigation ={setNavigation}></TextSelector>}
      {navigation === "Registration" && <Registration setNavigation ={setNavigation}></Registration>}
      
    </>
  )

}