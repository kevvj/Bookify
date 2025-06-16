import { View} from 'react-native'
import TextSelector from './components/Principal'
import { useState, useRef, useEffect } from 'react'
import LogIn from './components/LogIn'
import Welcome from './components/Welcome'
import Registration from './components/Registration'
import { useTimeout } from './useTimeout'
import supabase from './SupaBase'
import Files from './components/Files'
import SettingsPage from './components/Settings'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [navigation, setNavigation] = useState("Welcome")
  const webviewRef = useRef(null)
  const [selectedText, setSelectedText] = useState('')
  const [finalSelection, setFinalSelection] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [translatedText, setTranslatedText] = useState('sin traducción...')
  const [words, setWords] = useState<string[]>([])
  const [html, setHtml] = useState('<span>hola</span>')
  const [text, setText] = useState('')

  useTimeout(() => {
    const aaa = selectedText.replace(/[\n\r]+/g, ' ')

    setFinalSelection(aaa)

    console.log(JSON.stringify(finalSelection))

  }, selectedText === finalSelection ? null : 1500)

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        AsyncStorage.setItem('session', JSON.stringify(session))
      } else {
        AsyncStorage.removeItem('session')
      }
    })

    return () => subscription?.unsubscribe()

  }, [])

  useEffect(() => {
    const restore = async () => {
      const stored = await AsyncStorage.getItem('session')
      if (stored) {
        const parsed = JSON.parse(stored)
        supabase.auth.setSession(parsed)
      }
    }

    restore()
  }, [])


  return (
    <View style={{flex:1, backgroundColor:"white"}}>
      {navigation === "Welcome" && <Welcome setNavigation={setNavigation} />}

      {navigation === "Login" && <LogIn setNavigation={setNavigation}></LogIn>}

      {navigation === "Home" && <TextSelector
        setNavigation={setNavigation}
        webviewRef={webviewRef} selectedText={selectedText} setSelectedText={setSelectedText}
        finalSelection={finalSelection} setFinalSelection={setFinalSelection} isLoading={isLoading} setIsLoading={setIsLoading} translatedText={translatedText} setTranslatedText={setTranslatedText} words={words} setWords={setWords} html={html} setHtml={setHtml} text={text} setText={setText}
      ></TextSelector>}

      {navigation === "Registration" && <Registration setNavigation={setNavigation}></Registration>}


      {navigation === "Settings" && <SettingsPage setNavigation={setNavigation}></SettingsPage>}

      {navigation === "Files" && <Files
        setNavigation={setNavigation} setText={setText} setIsLoading={setIsLoading}
        setTranslatedText={setTranslatedText}
        finalSelection={finalSelection} selectedText={selectedText} setWords={setWords} words={words} setHtml={setHtml} navigation={navigation}></Files>}

    </View>
  )

}