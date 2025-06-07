import { View, Text, Button } from 'react-native'
import TextSelector from './components/Principal'
import { useState } from 'react'
import LogIn from './components/LogIn'
export default function App() {

  const [navigation, setNavigation] = useState("Login")
  return(
      navigation === "Login"? <LogIn setNavigation={setNavigation}></LogIn> : <TextSelector setNavigation={setNavigation}></TextSelector>
  )

}