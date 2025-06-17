import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
const Languages = ({ isOpen, setIsOpen, setSourceLanguage, setTargetLanguage, source, target, setSource, setTarget }: any) => {

    return (
        <ScrollView style={{ position: "absolute", backgroundColor: "white", top: "50%", left: "19%", display: isOpen ? "flex" : "none" }}>

            <View style={{ borderWidth: 1, borderColor: "black", alignItems: "center", justifyContent: "center", alignSelf: 'center', width: 250, gap: 10 }}>

                {LAN.map((item: any) => (
                    <TouchableOpacity key={item.code} onPress={() => {
                        setIsOpen(false)

                        source && setSourceLanguage(item.name)
                        target && setTargetLanguage(item.name)

                        setSource(false)
                        setTarget(false)

                    }}>
                        <Text style={{ borderBottomWidth: 1, borderBottomColor: "black", width: "100%", textAlign: "center" }}>{item.name}</Text>
                    </TouchableOpacity>
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