import { View, Text, ScrollView } from "react-native"
const Languages = () => {

    return (
        <ScrollView style={{}}>

            <View style={{ borderWidth: 1, borderColor: "black", alignItems: "center", justifyContent: "center", alignSelf: 'center', width: 150, gap: 10}}>

                {LAN.map((item: any) => (
                    <Text key={item.code} style={{ borderBottomWidth: 1, borderBottomColor: "black", width: "100%", textAlign: "center" }}>{item.name}</Text>
                ))}
            </View>
        </ScrollView>
    )
}

const LAN = [
    { code: 'ES', name: 'Español' },
    { code: 'EN', name: 'Inglés' },
    { code: 'FR', name: 'Francés' },
    { code: 'DE', name: 'Alemán' },
    { code: 'IT', name: 'Italiano' },
    { code: 'PT', name: 'Portugués' },
    { code: 'RU', name: 'Ruso' },
    { code: 'ZH', name: 'Chino' },
]

export default Languages