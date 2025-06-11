import { Text, TouchableOpacity, View } from "react-native"
import supabase from "../SupaBase"
const SaveWord = ({ Traslate, fetchData, finalSelection }: any) => {

    const addWords = async (words: string): Promise<void> => {
        const session = supabase.auth.session()
        if (!session) {
            console.error('User not logged in')
            return
        }

        const user = supabase.auth.user()
        if (!user) {
            console.error('Error fetching user')
            return
        }
        const { data, error } = await supabase
            .from("words")
            .insert([
                { word: words, user_id: user.id }
            ])
            .select()

        if (error) {
            console.error('Error inserting data:', error)
        }

        fetchData()
    }
    return (
        <View style={{ flex: 0.3 }}>
            <View style={{ alignSelf: "center", borderWidth: 2, borderColor: "#ccc", marginTop: 20, borderRadius: 10, width: "90%" }}>
                <Text style={{ padding: 15 }}>Traducción: {Traslate}</Text>
            </View>

            <TouchableOpacity onPress={() => addWords(finalSelection)}
                style={{
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