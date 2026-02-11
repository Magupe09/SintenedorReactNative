import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useCart } from '../context/CartContext';
import { router } from 'expo-router';

export default function CarritoFlotante() {
  const { cart } = useCart();

  // Si el carrito está vacío, no mostramos nada
  if (cart.length === 0) return null;

  return (
    <Pressable 
      style={styles.floatingButton} 
      onPress={() => router.push('/carrito')} // Luego crearemos una pantalla de Checkout
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{cart.length}</Text>
      </View>
      <Text style={styles.icon}>🛒</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff6600',
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Sombra en Android (Redmi 9)
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999, // Para que siempre esté por encima de todo
  },
  icon: { fontSize: 28 },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#2ecc71',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});