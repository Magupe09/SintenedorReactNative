import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext'; // Importamos el cerebro
import CarritoFlotante from '../components/CarritoFlotante'; // <-- Importamos el nuevo componente
import { View } from 'react-native';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';


export default function RootLayout() {
  useEffect(() => {
    // Este código escucha si el usuario entra o sale
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log("Usuario entró:", session.user.email);
        router.replace('/'); // Al entrar, vamos al inicio para que el "muro" verifique el perfil
      }
      if (event === 'SIGNED_OUT') {
        console.log("Usuario salió");
        router.replace('/login'); // Al salir, lo mandamos directo al login
      }
    });

    return () => subscription.unsubscribe(); // Limpiamos el oyente al cerrar la app
  }, []);
  return (
    <CartProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        <CarritoFlotante />
      </View>
    </CartProvider>
  );
}