import { View, Text } from "react-native"
import Header from "./Header"

const SettingsPage = ({setNavigation}:any) => {
    return (
        <>
            <Header setNavigation ={setNavigation}></Header>
            <View style ={{backgroundColor:"white"}}>
                <Text style={{ alignSelf: "center", fontSize: 20 }}>
                    Cambiar idioma
                </Text>

                <View style ={{justifyContent:"center", alignItems:"center"}}>
                    <Text>Idioma origen</Text>
                    <View style ={{borderWidth:1, borderColor:"black", paddingHorizontal:30, paddingVertical:5, borderRadius:10}}>
                        <Text>Español</Text>
                    </View>
                    <Text>Idioma destino</Text>
                    <View style ={{borderWidth:1, borderColor:"black", paddingHorizontal:30, paddingVertical:5, borderRadius:10}}>
                        <Text>Ingles</Text>
                    </View>
                </View>

                <Text style={{marginTop:40, textAlign:"center"}}>No se otras configuraciones aqui raras</Text>
            </View>
        </>
    )
}

export default SettingsPage