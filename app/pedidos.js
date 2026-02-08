import { View, Text, StyleSheet } from 'react-native';

export default function Pedidos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Órdenes Entrantes</Text>
      <Text>Aquí aparecerán los pedidos de tus clientes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});