import supabase from "../SupaBase"

export const signUp = async (full_name: string, email: string, password: string, phone:string) => {

    const { error } = await supabase.auth.signUp({
        email,
        password,
    }, {
        data: {
            full_name,
            phone
        }
    })

    if (error) {
        console.error('Error al registrarse:', error)
        return false
    } else {
        return true
    }
}