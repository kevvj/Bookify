import React, { useEffect } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import HtmlContent from '../HtmlContent.tsx'
import { useTimeout } from '../useTimeout.tsx'
import { StyleSheet } from 'react-native'
import Header from './Header.tsx'
import SaveWord from './SaveWord.tsx'


export default function TextSelector({ setNavigation, webviewRef, selectedText, setSelectedText, finalSelection, setFinalSelection, isLoading, setIsLoading, translatedText, setTranslatedText, words, setWords, html, setHtml, text, setText }: any) {


  useEffect(() => {
    const phrases = text.split(' ')
    const spans = phrases.map((w: any) => {
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

      <Header Traslate="Hola" setNavigation={setNavigation}></Header>
      <SaveWord></SaveWord>

      {text && <View style={{ width: '100%', flex: 1 }}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: HtmlContent(isLoading ? "Cargando..." : text, JSON.stringify(words), isLoading ? "Cargando..." : html) }}
          onMessage={handleMessage}
        />
      </View>}


    </View>
  )
}

