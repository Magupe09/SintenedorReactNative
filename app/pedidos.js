import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Pedidos() {
  // ESTADO 1: El usuario actual logueado
  const [user, setUser] = useState(null);
  
  // ESTADO 2: Los pedidos del usuario
  const [pedidos, setPedidos] = useState([]);
  
  // ESTADO 3: Control de carga (para mostrar spinner)
  const [loading, setLoading] = useState(true);
  
  // ESTADO 4: Para refrescar la lista (pull-to-refresh)
  const [refreshing, setRefreshing] = useState(false);

  // EFECTO 1: Se ejecuta cuando el componente monta
  useEffect(() => {
    const initScreen = async () => {
      // Paso A: Obtener el usuario autenticado
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Paso B: Si hay usuario, traer sus pedidos
      if (user) {
        await traerPedidos(user.id);
      }
    };
    
    initScreen();
  }, []);

  // FUNCIÓN: Traer los pedidos del usuario desde Supabase
  const traerPedidos = async (userId) => {
    try {
      setLoading(true);
      
      // Hacemos una consulta a la tabla 'orders' 
      // donde profile_id coincida con el userId
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('profile_id', userId)
        .order('created_at', { ascending: false }); // Ordenar por más reciente primero

      if (error) {
        console.log('Error al traer pedidos:', error);
        setPedidos([]);
      } else {
        setPedidos(data || []);
      }
    } catch (err) {
      console.log('Error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // FUNCIÓN: Para cuando el usuario desliza hacia abajo (refrescar)
  const onRefresh = () => {
    if (user) {
      setRefreshing(true);
      traerPedidos(user.id);
    }
  };

  // MIENTRAS CARGA: Mostrar spinner
  if (loading && !user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={{ marginTop: 10 }}>Cargando tus pedidos...</Text>
      </View>
    );
  }

  // Si no hay usuario logueado
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>⚠️ No estás logueado</Text>
        <Text>Por favor, inicia sesión primero.</Text>
      </View>
    );
  }

  // RENDERIZAR: Cada pedido en la lista
  const renderPedido = ({ item }) => (
    <View style={styles.pedidoCard}>
      {/* Número de pedido y estado */}
      <View style={styles.pedidoHeader}>
        <Text style={styles.pedidoId}>Pedido #{item.id}</Text>
        <Text style={[styles.status, { backgroundColor: item.status === 'pending' ? '#FFA500' : '#4CAF50' }]}>
          {item.status === 'pending' ? '⏳ En proceso' : '✅ Completado'}
        </Text>
      </View>

      {/* Datos del cliente */}
      <Text style={styles.customerInfo}>👤 {item.customer_name}</Text>
      <Text style={styles.customerInfo}>📱 {item.customer_phone}</Text>

      {/* Pizzas ordenadas */}
      <Text style={styles.label}>🍕 Pizzas:</Text>
      <Text style={styles.pizzasText}>{item.pizza_details}</Text>

      {/* Total */}
      <Text style={styles.total}>💰 Total: ${item.total_amount}</Text>

      {/* Fecha */}
      <Text style={styles.fecha}>📅 {new Date(item.created_at).toLocaleDateString('es-ES')}</Text>
    </View>
  );

  // SI NO HAY PEDIDOS
  if (pedidos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📋 Mis Pedidos</Text>
        <Text style={{ marginTop: 20, fontSize: 16, textAlign: 'center' }}>
          Aún no tienes pedidos. 🍕
        </Text>
      </View>
    );
  }

  // VISTA PRINCIPAL: Lista de pedidos
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Mis Pedidos ({pedidos.length})</Text>
      
      <FlatList
        data={pedidos}
        renderItem={renderPedido}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF6B35" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#FF6B35',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pedidoId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  customerInfo: {
    fontSize: 14,
    color: '#555',
    marginVertical: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  pizzasText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
    fontStyle: 'italic',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 8,
  },
  fecha: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
});