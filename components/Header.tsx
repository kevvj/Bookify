import { Button, Text, TouchableOpacity, View } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"


const Header = ({ Traslate, setNavigation }: any) => {
    return (
        <View style={{
            flex: 0.1,
            padding: 30,
            marginTop: 40, 
            backgroundColor:"white"
            
        }}>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Text onPress={() => setNavigation("Settings")}>
                    <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                </Text>


                <Text onPress={() => setNavigation("Files")}>
                    <FontAwesomeIcon icon={faHome} ></FontAwesomeIcon>
                </Text>


                <Text onPress={() => setNavigation("Login")}>
                    <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                </Text>
            </View>

        </View>
    )
}

export default Header