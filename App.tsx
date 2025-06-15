import { View, Text, Button } from 'react-native'
import TextSelector from './components/Principal'
import { useState, useRef, useEffect } from 'react'
import LogIn from './components/LogIn'
import Welcome from './components/Welcome'
import Registration from './components/Registration'
import FilePicker from './components/FilePicker'
import { useTimeout } from './useTimeout'
import supabase from './SupaBase'
import Files from './components/Files'
import SettingsPage from './components/Settings'

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

  useEffect(() => {
    const session = supabase.auth.session()
    if (!session) {
    } else {
    }
  }, [])


   useTimeout(() => {
      const aaa = selectedText.replace(/[\n\r]+/g, ' ')
  
      setFinalSelection(aaa)
  
      console.log(JSON.stringify(finalSelection))
  
    }, selectedText === finalSelection ? null : 1500)



  return (
    <>
      {navigation === "Welcome" && <Welcome setNavigation={setNavigation} />}

      {navigation === "Login" && <LogIn setNavigation={setNavigation}></LogIn>}

      {navigation === "Home" && <TextSelector
        setNavigation={setNavigation}
        webviewRef={webviewRef} selectedText={selectedText} setSelectedText={setSelectedText}
        finalSelection={finalSelection} setFinalSelection={setFinalSelection} isLoading={isLoading} setIsLoading={setIsLoading} translatedText={translatedText} setTranslatedText={setTranslatedText} words={words} setWords={setWords} html={html} setHtml={setHtml} text={text} setText={setText}
      ></TextSelector>}

      {navigation === "Registration" &&

        <Registration setNavigation={setNavigation}></Registration>}

      {navigation === "FilePicker" && <FilePicker
        setTranslatedText={setTranslatedText}
        setText={setText} setIsLoading={setIsLoading} finalSelection={finalSelection} selectedText={selectedText} setWords={setWords} words={words} setNavigation={setNavigation} setHtml={setHtml} navigation={navigation}
      ></FilePicker>}

      {navigation === "Settings" && <SettingsPage setNavigation={setNavigation}></SettingsPage>}

      {navigation === "Files" && <Files
        setNavigation={setNavigation} setText={setText} setIsLoading={setIsLoading}
        setTranslatedText={setTranslatedText}
        finalSelection={finalSelection} selectedText={selectedText} setWords={setWords} words={words} setHtml={setHtml} navigation={navigation}></Files>}

    </>
  )

}