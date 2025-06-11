import { useEffect, useState } from "react"
import supabase from "../SupaBase"
import { View, Text, Image } from "react-native"
import Header from "./Header"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

const Files = ({ setNavigation }: any) => {

    const [Files, setFiles] = useState<any[]>([])

    useEffect(() => {
        const session = supabase.auth.session()
        if (!session) {
            setNavigation('LogIn')
        }

        const fetchData = async () => {
            const { data, error } = await supabase.storage
                .from('files')
                .list('allfiles')

            if (error) return

            data && setFiles(data.filter(item => item.name.endsWith('.pdf')))


            const response  = await fetch('https://bookify-backend-dld4.onrender.com/pdfurl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: "https://wqqrmizomxkmgbzwjxrd.supabase.co/storage/v1/object/public/files/allfiles/Ejemplo_de_texto_de_pdf.pdf" }),
            })

            const result = await response.json()

            console.log(result)
        }

        fetchData()

    }, [])

    return (
        <>
            <Header setNavigation={setNavigation}></Header>

            <View style={{ alignItems: "center", flex: 1, gap: 10 }}>

                <Text style={{ fontSize: 20 }}>Archivos recientes</Text>

                {Files.map(item => (
                    <View key={item.id} style={{ borderWidth: 1, borderColor: "black", paddingHorizontal: 10, paddingVertical: 5, width: 300, borderRadius: 5, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: "black", width: 240 }} onPress={() => setNavigation('Home')}>{item.name}</Text>
                        <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>
                    </View>
                ))}


            </View>
        </>
    )
}



export default Files