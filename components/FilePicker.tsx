import React, { useEffect, useState } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native'
import { pick } from '@react-native-documents/picker'
import { StyleSheet } from 'react-native'
import supabase from '../SupaBase.tsx'
import 'react-native-url-polyfill/auto'
import Header from './Header.tsx'
interface PickedFile {
  name?: string | null;
  type?: string | null;
  uri: string;
  size?: number | null;
}

const FilePicker = ({ setText, setIsLoading, finalSelection, selectedText, setWords, words, setNavigation, setHtml, navigation, setTranslatedText}: any) => {
  const [fileText, setFileText] = useState('a')
  const [traslateText, setTraslateText] = useState('Texto a traducir')

  

  const pickFile = async () => {

    try {
      const [res] = await pick({
        type: ['*/*'],
      })
      if (res) setData(res)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error al seleccionar archivo:', err.message)
      } else {
        console.error('Error desconocido:', err)
      }
    }
  }

  const setData = async (fileInfo: PickedFile) => {
    setIsLoading(true)
    const formData = new FormData()

    fileInfo && formData.append('file', {
      uri: fileInfo.uri,
      type: fileInfo.type || 'application/pdf',
      name: fileInfo.name || 'archivo.pdf',
    } as any)

    const pruebaa = await fetch('https://bookify-backend-dld4.onrender.com/prueba', {
      method: 'POST',
      body: formData,

    })

    const result = await pruebaa.json()
    console.log(result)
    setFileText(result.texto)
    setText(result.texto)
    console.log("tumama")

    if (result.texto) {
      setIsLoading(false)
      setNavigation('Home')
    }
  }

  



  const addWords = async (words: string): Promise<void> => {
    const session = supabase.auth.session()
    if (!session) {
      console.error('User not logged in')
      return
    }

    const user = supabase.auth.user()
    if (!user) {
      console.error('Error fetching user')
      return
    }
    const { data, error } = await supabase
      .from("words")
      .insert([
        { word: words, user_id: user.id }
      ])
      .select()

    if (error) {
      console.error('Error inserting data:', error)
    }

  //fetchData()
  }



  return (
    <>
    <Header setNavigation ={setNavigation}></Header>
      <View style={{ marginTop: 70 }}>
        <TouchableOpacity onPress={() => {
          setNavigation('Home')
          pickFile()
        }} style={styles.button}>
          <Text style={{ color: 'white' }}>Elije un archivo</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: "center" }}>El formato del archivo debe de ser compatible</Text>
      </View>
    </>
  )

}

const styles = StyleSheet.create({

  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 120,
    alignSelf: "center"
  }
})

export default FilePicker