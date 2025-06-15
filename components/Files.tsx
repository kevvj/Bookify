import { useEffect, useState } from "react"
import supabase from "../SupaBase"
import { View, Text, Image } from "react-native"
import Header from "./Header"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import FilePicker from "./FilePicker"

const Files = ({ setNavigation, setText, setIsLoading, setTranslatedText, finalSelection, selectedText, setHtml, setWords, navigation, words}: any) => {

    const [Files, setFiles] = useState<any[]>([])
    const [isLoggin, setIsLoggin] = useState(false)

    useEffect(() => {
        const session = supabase.auth.session()
        if (!session) {
            setIsLoggin(false)
        }else{
            setIsLoggin(true)
        }

        const fetchData = async () => {
            const { data, error } = await supabase.storage
                .from('files')
                .list('allfiles')

            if (error) return

            data && setFiles(data.filter(item => item.name.endsWith('.pdf')))
            console.log(data)
        }

        fetchData()

    }, [])

    const getFile = (name: string) => {
        const { data, error } = supabase.storage
            .from('files')
            .getPublicUrl(`allfiles/${name}`)

        if (data) return data.publicURL
    }

    const handleFile = async (name: string) => {
        setIsLoading(true)
        const url = getFile(name)

        const { data, error } = await supabase.storage
            .from('files')
            .list('allfiles')

        if (error) return

        data && setFiles(data.filter(item => item.name.endsWith('.pdf')))

        const response = await fetch('https://bookify-backend-dld4.onrender.com/pdfurl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        })
        const result = await response.json()
        console.log(result)
        setText(result.texto)
        result && setIsLoading(false)
    }

    return (
        <>
            <Header setNavigation={setNavigation}></Header>

            <View style={{ alignItems: "center", flex: 1, gap: 10 }}>

                <Text style={{ fontSize: 20 }}>Archivos recientes</Text>

                {isLoggin ? Files.map(item => (
                    <View key={item.id} style={{ borderWidth: 1, borderColor: "black", paddingHorizontal: 10, paddingVertical: 5, width: 300, borderRadius: 5, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: "black", width: 240 }} onPress={() => {
                            handleFile(item.name)
                            setNavigation('Home')
                        }}>{item.name}</Text>
                        <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>
                    </View>
                )): <Text>Esperando a que inicies sesión</Text>}
            </View>

            <FilePicker 
            setTranslatedText={setTranslatedText}
            setText={setText} setIsLoading={setIsLoading} finalSelection={finalSelection} selectedText={selectedText} setWords={setWords} words={words} setNavigation={setNavigation} setHtml={setHtml} navigation={navigation}
            ></FilePicker>
        </>
    )
}



export default Files