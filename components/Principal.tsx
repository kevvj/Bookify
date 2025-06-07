import React, { useRef, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { WebView } from 'react-native-webview'
import { useState } from 'react'
import HtmlContent from '../HtmlContent.tsx'
import { useTimeout } from '../useTimeout.tsx'
import FilePicker from '../components/FilePicker.tsx'
import { StyleSheet } from 'react-native'
import Header from './Header.tsx'


export default function TextSelector({ setNavigation }: any) {
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

  const handleMessage = (event: any) => {
    const ST = event.nativeEvent.data
    setSelectedText(ST)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },

    button: {
      padding: 0,
      margin: 0,
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
      borderRadius: 0,

    }
  })

  return (

    <View style={styles.container}>

      <Header Traslate ="Hola"></Header>


      <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>

        <FilePicker
          setText={setText}
          setIsLoading={setIsLoading}
          finalSelection={finalSelection}
          selectedText={selectedText}
          setWords={setWords}
          words={words}
          setNavigation={setNavigation}
          setHtml={setHtml}
        />

      </View>

      {text && <View style={{ width: '100%', flex: 0.3 }}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: HtmlContent(isLoading ? "Cargando..." : text, JSON.stringify(words), isLoading ? "Cargando..." : html) }}
          onMessage={handleMessage}
        />
      </View>}

      {/* <View style={{ position: 'absolute', top: 0, right: 0, padding: 30 }}>
        <Text>Texto final:{finalSelection}</Text>
        <Text>Texto seleccionado: {selectedText}</Text>
        <Text>Texto traducido: {translatedText}</Text>
      </View> */}


    </View>
  )
}

