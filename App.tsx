import { View, Text, Button } from 'react-native'
import TextSelector from './components/Principal'
import { useState, useRef, useEffect } from 'react'
import LogIn from './components/LogIn'
import Welcome from './components/Welcome'
import Registration from './components/Registration'
import FilePicker from './components/FilePicker'
import { useTimeout } from './useTimeout'

export default function App() {
  const [navigation, setNavigation] = useState("Welcome")
  const webviewRef = useRef(null)
  const [selectedText, setSelectedText] = useState('')
  const [finalSelection, setFinalSelection] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [translatedText, setTranslatedText] = useState('hola')
  const [words, setWords] = useState<string[]>([])
  const [html, setHtml] = useState('<span>hola</span>')
  const [text, setText] = useState('')

  useEffect(() => {
    console.log(words)
  }, [words])

  useEffect(() => {
    const phrases = text.split(' ')
    const spans = phrases.map((w) => {
      return `<span class = "${words.includes(w) ? "color" : ""}">${w}</span>`
    }).join('')
    setHtml(spans)
  }, [text, words])

  useTimeout(() => {
    setFinalSelection(selectedText)
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

      {navigation === "Registration" && <Registration setNavigation={setNavigation}></Registration>}

      {navigation === "FilePicker" && <FilePicker
        setText={setText} setIsLoading={setIsLoading} finalSelection={finalSelection} selectedText={selectedText} setWords={setWords} words={words} setNavigation={setNavigation} setHtml={setHtml} navigation ={navigation}
      ></FilePicker>}

    </>
  )

}