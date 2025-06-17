import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import Header from "./Header"
import Languages from "./LanguageItems"
import { useState } from "react"

const SettingsPage = ({ setNavigation }: any) => {
    const [isOpen, setIsOpen] = useState(false)
    const [sourceLanguage, setSourceLanguage] = useState("Español")
    const [targetLanguage, setTargetLanguage] = useState("Ingles")
    const [source, setSource] = useState(false)
    const [target, setTarget] = useState(false)
    return (
        <View style={{ flex: 1, height:"100%" }}>
            <Header setNavigation={setNavigation}></Header>
            <View style={{ backgroundColor: "white", flex:1, marginTop:50 }}>
                <Text style={{ alignSelf: "center", fontSize: 20 }}>
                    Cambiar idioma
                </Text>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text>Idioma origen</Text>

                    <TouchableOpacity
                        onPress={() => {
                            setIsOpen(true)
                            setSource(true)
                        }}
                        style={{ borderWidth: 1, borderColor: "black", paddingHorizontal: 30, paddingVertical: 5, borderRadius: 10 }}>
                        <Text>{sourceLanguage}</Text>
                    </TouchableOpacity>

                    <Text>Idioma destino</Text>

                    <TouchableOpacity
                        onPress={() => {
                            setIsOpen(true)
                            setTarget(true)
                        }}
                        style={{ borderWidth: 1, borderColor: "black", paddingHorizontal: 30, paddingVertical: 5, borderRadius: 10 }}>
                        <Text>{targetLanguage}</Text>
                    </TouchableOpacity>

                </View>

            </View>

            <Languages isOpen={isOpen} setIsOpen={setIsOpen} setSourceLanguage={setSourceLanguage} setTargetLanguage={setTargetLanguage} source={source} target={target} setSource={setSource} setTarget={setTarget}></Languages>
        </View>
    )
}

export default SettingsPage