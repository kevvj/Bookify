import { Text, View } from "react-native"


const Header = ({ Traslate }: any) => {
    return (
        <View style={
            {
                flex: 0.2,
                borderWidth: 1,
                borderBlockColor: "#ccc",
                padding: 30,
                marginTop: 40,
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                justifyContent: "center"
            }
        }>
            <Text>
                {Traslate}
            </Text>
            
            <Text>
                
            </Text>

            <Text>
                Iniciar sección
            </Text>
        </View>
    )
}

export default Header