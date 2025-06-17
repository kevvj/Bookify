import { View, Text, TouchableOpacity } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { StyleSheet } from 'react-native'


const RegistrationSuccess = ({ setNavigation }: any) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, backgroundColor:"white", padding:20}}>
            <Text style ={{fontSize:20}}>Si estás viendo este mensaje, significa que tu registro fue exitoso. Ahora debes ir a tu correo electrónico y confirmar tu cuenta para poder continuar (si no confirmas tu correo, no podrás iniciar sesión).</Text>

            <TouchableOpacity 
            onPress={() => setNavigation('Login')}
             style={styles.button}>
                <Text style={styles.text}>Regresar a inicio de sesión</Text>
            </TouchableOpacity>

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
        width: 250,
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

export default RegistrationSuccess