import { View, Text, Button, TextInput, TouchableOpacity } from "react-native"
import React, { useState, useEffect } from "react"
import { signIn } from '../hooks/SignIn.tsx'
import { StyleSheet } from 'react-native'
import supabase from "../SupaBase.tsx"

export default function LogIn({ setNavigation }: any) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogIn = async () => {
        if (!email) {
            setError('No pusiste email')
            return
        }
        if (!password) {
            setError('No pusiste la contraseña')
            return
        }

        const session = await signIn(email, password)


        if (session) {
            setNavigation('Files')
        }else{
            setError('Credenciales no existen')
            return
        }

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Inicio de sesión</Text>

            <View style={{ gap: 10 }}>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text>Correo</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Escribe tu correo"
                        style={{ marginLeft: 20, marginRight: 10, borderWidth: 0.5, borderColor: '#000', width: 200, padding: 4 }}
                    />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text>Contraseña</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Escribe tu contraseña"
                        secureTextEntry={true}
                        style={{ marginLeft: 20, marginRight: 10, borderWidth: 0.5, borderColor: '#000', width: 200, padding: 4 }}
                    />
                </View>

            </View>

            <Text style ={{color:"red", textAlign:"center"}}>{error}</Text>

            <View style={styles.button_container}>

                <TouchableOpacity onPress={() => handleLogIn()} style={styles.button}>
                    <Text style={styles.text}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setNavigation('Registration')} style={styles.button} >
                    <Text style={styles.text}>Registrar</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignSelf: "center"
    },

    text: {
        color: "white",
        alignSelf: "center"
    },

    button_container: {
        gap: 10,
        marginTop: 20,
        flexDirection: "row"
    }
})