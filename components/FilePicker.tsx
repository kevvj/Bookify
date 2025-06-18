import React, { useEffect, useState } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native'
import { pick } from '@react-native-documents/picker'
import { StyleSheet } from 'react-native'
import supabase from '../SupaBase.tsx'
import 'react-native-url-polyfill/auto'
import Header from './Header.tsx'
import RNFS from 'react-native-fs'
import { Buffer } from 'buffer'

global.Buffer = global.Buffer || Buffer

interface PickedFile {
  name?: string | null;
  type?: string | null;
  uri: string;
  size?: number | null;
}

const FilePicker = ({ setText, setIsLoading, setNavigation }: any) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const session = supabase.auth.session()
    if (!session) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
      setUserId(session?.user?.id || '')
    }
  }, [])

  const pickFile = async () => {

    try {
      const [res] = await pick({
        type: ['*/*'],
      })
      if (res) {
        setData(res)
      }
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
    setText(result.texto)

    if (result.texto) {
      setIsLoading(false)
      setNavigation('Home')

      isLoggedIn && uploadToSupabase(fileInfo)
    }
  }

  const uploadToSupabase = async (fileInfo: PickedFile) => {
    const filePath = fileInfo.uri.replace('file://', '')
    const fileName = fileInfo.name || 'archivo.pdf'
    const fileType = fileInfo.type || 'application/pdf'

    const base64Data = await RNFS.readFile(filePath, 'base64')
    const fileBuffer = Buffer.from(base64Data, 'base64')

    const safeFileName = fileName.replace(/\s+/g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const remotePath = `${userId}/${safeFileName}`

    const { data, error } = await supabase.storage
      .from('files')
      .upload(remotePath, fileBuffer, {
        contentType: fileType,
        upsert: true,
      })

    if (error) console.error('Error al subir:', error)
    else console.log('Subido correctamente:', data?.Key)
  }


  return (
    <>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => {
          setNavigation('Home')
          pickFile()
        }} style={styles.button}>
          <Text style={{ color: 'white', textAlign:"center" }}>Elige un archivo</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: "center" }}>El formato del archivo debe de ser compatible.</Text>
      </View>
    </>
  )

}

const styles = StyleSheet.create({

  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 130,
    alignSelf: "center"
  }
})

export default FilePicker