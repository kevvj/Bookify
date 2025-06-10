import { Button, Text, TouchableOpacity, View } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"


const Header = ({ Traslate, setNavigation }: any) => {
    return (
        <View style={{
            flex: 0.3,
            padding: 30,
            marginTop: 40,
        }}>

            <View style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Text onPress={() => setNavigation("FilePicker")}>
                    <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                </Text>


                <Text onPress={() => setNavigation("Welcome")}>
                    <FontAwesomeIcon icon={faHome} ></FontAwesomeIcon>
                </Text>


                <Text onPress={() => setNavigation("Login")}>
                    <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                </Text>
            </View>

            <View style={{ alignSelf: "center", borderWidth: 2, borderColor: "#ccc", marginTop: 40, borderRadius: 10, width: "100%" }}>
                <Text style={{ padding: 15 }}>Traducción: {Traslate}</Text>
            </View>

            <TouchableOpacity style={{
                backgroundColor: 'black',
                padding: 10,
                borderRadius: 5,
                width: 121,
                alignSelf: "center",
                marginTop:20
            }}>
                <Text style={{color:"white"}}>Guardar palabra</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header