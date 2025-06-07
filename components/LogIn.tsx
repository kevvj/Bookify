import { View, Text, Button, TextInput } from "react-native"
import React, { useState } from "react"
import { signIn } from '../hooks/SignIn.tsx'
import { EMAIL, PASSWORD } from '@env'

export default function LogIn({ setNavigation }: any) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the App!</Text>

            <View style={{gap: 10}}>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Type your email"
                        style={{ marginLeft: 20, marginRight: 10, borderWidth: 0.5, borderColor: '#000', width: 200, padding: 4 }}
                    />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Type your password"
                        secureTextEntry={true}
                        style={{ marginLeft: 20, marginRight: 10, borderWidth: 0.5, borderColor: '#000', width: 200, padding: 4 }}
                    />
                </View>

            </View>

            <Button title="Log In" onPress={() => signIn("kevinelrey123456@gmail.com", "bendipalteo777")}/>
            <Button title="Sign Up" onPress={() => setNavigation('Home')} />
        </View>
    )
}