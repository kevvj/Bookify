import { Text, TouchableOpacity, View } from "react-native"
const SaveWord = ({ Traslate }: any) => {
    return (
        <View style={{flex:0.3}}>
            <View style={{ alignSelf: "center", borderWidth: 2, borderColor: "#ccc", marginTop: 20, borderRadius: 10, width: "90%" }}>
                <Text style={{ padding: 15 }}>Traducción: {Traslate}</Text>
            </View>

            <TouchableOpacity style={{
                backgroundColor: 'black',
                padding: 10,
                borderRadius: 5,
                width: 121,
                alignSelf: "center",
                marginTop: 20
            }}>
                <Text style={{ color: "white" }}>Guardar palabra</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SaveWord