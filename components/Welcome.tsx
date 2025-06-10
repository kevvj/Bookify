import { View, Text, TouchableOpacity, Image } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

const Welcome = ({ setNavigation }: any) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 40 }}>
                    ¡Bienvenido!
                </Text>

                <Text>
                    Traduce tus textos y documentos en segundos
                </Text>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 80, gap: 10 }}>

                <View style={{ width: 330 }}>
                    <TouchableOpacity style={{ borderColor: "black", borderWidth: 1, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 20, }}>
                        <Text style={{ fontSize: 20, alignSelf: "center" }}>Registrarte</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", width: 330, justifyContent: "space-between" }}>

                    <TouchableOpacity 
                    style={{ borderColor: "black", borderWidth: 1, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 20, }}
                    onPress={()=>setNavigation('Login')}
                    >
                        <Text style={{ fontSize: 20, alignSelf: "center" }} >Iniciar sesión</Text>
                    </TouchableOpacity>

                    <Image source={require('../public/email.png')} style={{ width: 40, height: 40 }}></Image>
                    <Image source={require('../public/facebook.png')} style={{ width: 40, height: 40 }}></Image>
                    <Image source={require('../public/twitter.png')} style={{ width: 40, height: 40 }}></Image>

                </View>

            </View>

        </View>
    )
}

export default Welcome