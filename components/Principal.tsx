import React, { useEffect } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import HtmlContent from '../HtmlContent.tsx'
import { useTimeout } from '../useTimeout.tsx'
import { StyleSheet } from 'react-native'
import Header from './Header.tsx'
import SaveWord from './SaveWord.tsx'
import supabase from '../SupaBase.tsx'
import { useState } from 'react'


export default function TextSelector({ setNavigation, webviewRef, selectedText, setSelectedText, finalSelection, setFinalSelection, isLoading, setIsLoading, translatedText, setTranslatedText, words, setWords, html, setHtml, text, setText }: any) {

  const [userId, setUserId] = useState('')

  useEffect(() => {
    setIsLoading(true)
    const session = supabase.auth.session()
    if (!session) {
    } else {
      const id = session.user?.id
      if (!id) return

      setUserId(id)
      fetchData(id)
      console.log(id)
    }
  }, [])
  useEffect(() => {
    if (finalSelection) {
      traducirTexto(finalSelection, "ES")
    }
  }, [finalSelection])

  useEffect(() => {
    const phrases = text.split(' ')
    const spans = phrases.map((w: any) => {
      return `<span class="${words.some((word: any) => word.split(' ').includes(w.replace(/[.,!?;:()"\[\]]/g, ''))) ? 'color' : ''}">${w}</span>`

    }).join('')
    setHtml(spans)
  }, [text, words])



  const fetchData = async (id: string) => {
    setIsLoading(true)
    const { data, error } = await supabase.from('words').select('*').eq('user_id', id)
    if (error) {
      console.error('Error:', error)
    } else {
      setWords(data.map((w) => {
        return w.word
      }))
    }
  }

  useTimeout(() => {
    const aaa = selectedText.replace(/[\n\r]+/g, ' ')

    setFinalSelection(aaa)


  }, selectedText === finalSelection ? null : 1500)

  const traducirTexto = async (textoOriginal: string, idiomaDestino: string) => {
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
        return null
      }
      setTranslatedText(data.translations?.[0]?.text)
      return data.translations?.[0]

    } catch (error) {
      console.error('Error al traducir con DeepL:', error)
      return null
    }
  }

  const handleMessage = (event: any) => {
    const ST = event.nativeEvent.data
    setSelectedText(ST.replace(/[\n\r]+/g, ' '))
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "white"
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
      <SaveWord Traslate={translatedText} fetchData={() => fetchData(userId)} finalSelection={finalSelection}></SaveWord>

      {text && <View style={{ width: '100%', flex: 1 }}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: HtmlContent(isLoading ? "Cargando..." : html) }}
          onMessage={handleMessage}
        />
      </View>}


    </View>
  )
}

