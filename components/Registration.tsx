import { View, Text, Button, TextInput, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { signIn } from '../hooks/SignIn.tsx'
import { StyleSheet } from 'react-native'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { signUp } from "../hooks/RegistrationForm.tsx"

export default function Registration({ setNavigation }: any) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')

    const [error, setError] = useState('')

    const handleRegister = async () => {

        if (!email || !password || !fullName || !confirmPassword || !phone) {
            setError('Rellene todos los espacios')
            return
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }
        const result = await signUp(fullName, email, password, phone)
        if (result) {
            setNavigation('RegistrationSuccess')
            setError('')
        } else {
            setError('Algo salió mal con el registro')
            return
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, backgroundColor: "white" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Registro</Text>

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

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>Confirmar contraseña</Text>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirma tu contraseña"
                        secureTextEntry={true}
                        style={{ marginLeft: 20, marginRight: 10, borderWidth: 0.5, borderColor: '#000', width: 200, padding: 4 }}
                    />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>Nombre completo</Text>
                    <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Escribe tu nombre"
                        style={{ marginLeft: 20, marginRight: 10, borderWidth: 0.5, borderColor: '#000', width: 200, padding: 4 }}
                    />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>Telefono</Text>
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Escribe tu telefono"
                        style={{ marginLeft: 20, marginRight: 10, borderWidth: 0.5, borderColor: '#000', width: 200, padding: 4 }}
                    />
                </View>

            </View>

            <Text style={{ color: "red" }}>{error}</Text>

            <View style={styles.button_container}>


                <TouchableOpacity onPress={() => handleRegister()} style={styles.button} >
                    <Text style={styles.text}>Registrar</Text>
                </TouchableOpacity>

            </View>



            <TouchableOpacity
                onPress={() => { setNavigation('Login') }} style={{ position: "absolute", top: 200, right: 40 }} ><FontAwesomeIcon icon={faX}></FontAwesomeIcon></TouchableOpacity>

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
        marginTop: 0,
        flexDirection: "row"
    }
})