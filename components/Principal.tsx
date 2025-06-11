import React, { useEffect } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import HtmlContent from '../HtmlContent.tsx'
import { useTimeout } from '../useTimeout.tsx'
import { StyleSheet } from 'react-native'
import Header from './Header.tsx'
import SaveWord from './SaveWord.tsx'
import supabase from '../SupaBase.tsx'


export default function TextSelector({ setNavigation, webviewRef, selectedText, setSelectedText, finalSelection, setFinalSelection, isLoading, setIsLoading, translatedText, setTranslatedText, words, setWords, html, setHtml, text, setText }: any) {

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('words').select('*')
      if (error) {
        console.error('Error:', error)
      } else {
        setWords(data.map((w) => {
          return w.word
        }))
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    if (finalSelection) {
      traducirTexto(finalSelection, "EN")
    }
  }, [finalSelection])

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

  const traducirTexto = async (textoOriginal: string, idiomaDestino = 'EN') => {
    try {
      const params = new URLSearchParams();
      params.append('auth_key', 'd9e72a48-92f8-40f6-9829-7a16a507fd91:fx'); // <-- API key va en el body
      params.append('text', textoOriginal);
      params.append('target_lang', idiomaDestino); // 'EN', 'ES', 'FR', etc.

      const response = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })

      const data = await response.json()

      if (data.message) {
        console.warn('Error al traducir:', data.message)
        return null
      }
      setTranslatedText(data.translations?.[0]?.text)
      console.log(data)
      return data.translations?.[0]

    } catch (error) {
      console.error('Error al traducir con DeepL:', error)
      return null
    }
  }

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
      <SaveWord Traslate={translatedText}></SaveWord>

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

