import { View, Text, TouchableOpacity } from "react-native"
import supabase from "../SupaBase"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const Words = () => {

    const [words, setWords] = useState<any>([])

    useEffect(() => {
        fetchWords()
    }, [])

    const fetchWords = async () => {
        const { data, error } = await supabase
            .from('words')
            .select('*')

        if (error) {
            console.log(error)
            return
        }
        setWords(data)
        console.log(data)
    }

    const handleDelete = async (id: number) => {
        const { data, error } = await supabase
            .from('words')
            .delete()
            .eq('id', id)

        if (error) {
            console.log(error)
            return
        }

        fetchWords()
        console.log('Borrao')
    }
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>Palabras o frases guardadas:</Text>

            {words.length === 0 && <Text style ={{alignSelf:"center"}}>Sin palabras...</Text>}
            {words.map((item: any, index: any) => (
                <View key={item.id} style={{ flexDirection: "row", gap: 10, alignSelf: "center", width: "70%", alignItems: "center" }}>
                  <Text>{index + 1}. {item.word}.</Text>
                    
                    <TouchableOpacity onPress={() => {
                        handleDelete(item.id)
                    }}>
                        <FontAwesomeIcon icon={faTrash} size={13}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>

            ))}
        </View>
    )
}

export default Words