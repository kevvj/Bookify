import supabase from '../SupaBase.tsx'
import 'react-native-url-polyfill/auto'

export const signIn = async (email: string, password: string) => {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password
    })

    if (error) {
      console.error('Error al iniciar sesión:', error)
      return false
    }else{
      return true
    }
  }