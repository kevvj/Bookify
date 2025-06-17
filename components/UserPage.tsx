import { View, Text, TouchableOpacity } from "react-native"
import Header from "./Header"
import supabase from "../SupaBase"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react"

const UserPage = ({ setNavigation }: any) => {

    const [session, setSession] = useState<any>([])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        await AsyncStorage.removeItem('session')
        setNavigation('Login')
    }

    useEffect(() => {
        const fetchUser = () =>{
            const session = supabase.auth.session()
            setSession(session)
            console.log(session)
        }

        fetchUser()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Header setNavigation={setNavigation}></Header>

            <View style={{ marginBottom: 40 }}>
                <Text style={{ textAlign: "center" }}>Kevin José Tapias Villalba</Text>
                <Text style={{ textAlign: "center" }}>id: {session?.user?.id}</Text>
                <Text style={{ textAlign: "center" }}>email: {session?.user?.email}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    handleLogout()
                }}
                style={{ alignSelf: "center", borderWidth: 1, borderColor: "black", padding: 5, borderRadius: 5 }}>
                <Text style={{ textAlign: "center", color: "red" }}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserPage