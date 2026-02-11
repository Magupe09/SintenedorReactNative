import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext'; // Importamos el cerebro
import CarritoFlotante from '../components/CarritoFlotante'; // <-- Importamos el nuevo componente
import { View } from 'react-native';


export default function RootLayout() {
  return (
    <CartProvider>
      <View style={{ flex: 1 }}> 
        <Stack screenOptions={{ headerShown: false }} />
        <CarritoFlotante /> 
      </View> 
    </CartProvider>
  );
}