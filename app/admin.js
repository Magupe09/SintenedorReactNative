import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

export default function DashboardAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetchPedidos();
  }, []);

  async function fetchPedidos() {
    setCargando(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setPedidos(data);
    }
    setCargando(false);
  }

  async function actualizarEstado(id, nuevoEstado) {
    const { error } = await supabase
      .from('orders')
      .update({ status: nuevoEstado })
      .eq('id', id);

    if (error) {
      Alert.alert('Error al actualizar', error.message);
    } else {
      // Actualizamos el estado localmente para que sea instantáneo
      setPedidos(pedidos.map(p => p.id === id ? { ...p, status: nuevoEstado } : p));
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente': return '#f39c12';
      case 'cocinando': return '#3498db';
      case 'enviado': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  const renderPedido = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.client}>{item.customer_name}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.badgeText}>{item.status?.toUpperCase() || 'N/A'}</Text>
        </View>
      </View>

      <Text style={styles.details}>{item.pizza_details}</Text>
      
      <View style={styles.footerCard}>
        <Text style={styles.phone}>📞 {item.customer_phone}</Text>
        <Text style={styles.price}>${item.total_amount}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable 
          style={[styles.btnAction, { backgroundColor: '#3498db' }]} 
          onPress={() => actualizarEstado(item.id, 'cocinando')}>
          <Text style={styles.btnText}>👨‍🍳 Cocinar</Text>
        </Pressable>

        <Pressable 
          style={[styles.btnAction, { backgroundColor: '#2ecc71' }]} 
          onPress={() => actualizarEstado(item.id, 'enviado')}>
          <Text style={styles.btnText}>🛵 Enviar</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Panel de Pedidos</Text>
        <Pressable onPress={fetchPedidos} disabled={cargando}>
          <Text style={{ color: '#3498db', fontWeight: 'bold' }}>{cargando ? '...' : 'Actualizar'}</Text>
        </Pressable>
      </View>

      {cargando && <ActivityIndicator size="large" color="#3498db" style={{ marginBottom: 10 }} />}

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>No hay pedidos registrados.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', paddingHorizontal: 15 },
  titleContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 50, 
    marginBottom: 20 
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a' },
  listContent: { paddingBottom: 30 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    padding: 16, 
    marginBottom: 15, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  headerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  client: { fontSize: 18, fontWeight: '700', color: '#2c3e50' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  details: { fontSize: 16, color: '#546e7a', lineHeight: 22, marginBottom: 15 },
  footerCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0' 
  },
  phone: { fontSize: 14, color: '#7f8c8d', fontWeight: '500' },
  price: { fontSize: 18, color: '#27ae60', fontWeight: 'bold' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  btnAction: { flex: 0.48, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  empty: { textAlign: 'center', color: '#95a5a6', marginTop: 50, fontSize: 16 }
});