import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';

export default function CompletarPerfil() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [barrio, setBarrio] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function guardarPerfil() {
    if (!nombre || !telefono || !barrio) {
      Alert.alert("Datos obligatorios", "Por favor, completa todos los campos para continuar.");
      return;
    }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: nombre,
        phone_number: telefono,
        neighborhood: barrio,
      })
      .eq('id', user.id);

    if (error) {
      Alert.alert("Error", "No pudimos guardar tus datos: " + error.message);
    } else {
      Alert.alert("¡Todo listo!", "Ya puedes disfrutar de nuestras pizzas.");
      router.replace('/'); // Volvemos al inicio ya con los datos cargados
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🍕</Text>
      <Text style={styles.title}>¡Casi terminamos!</Text>
      <Text style={styles.subtitle}>Necesitamos estos datos para coordinar tus entregas y enviarte promociones exclusivas.</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Tu Nombre Completo" 
        value={nombre} 
        onChangeText={setNombre} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="WhatsApp (Ej: 1234567890)" 
        value={telefono} 
        onChangeText={setTelefono} 
        keyboardType="phone-pad"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Barrio / Zona" 
        value={barrio} 
        onChangeText={setBarrio} 
      />

      <Pressable 
        style={[styles.btn, loading && { opacity: 0.7 }]} 
        onPress={guardarPerfil} 
        disabled={loading}
      >
        <Text style={styles.btnText}>{loading ? 'Guardando...' : 'Empezar a pedir'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
  emoji: { fontSize: 50, textAlign: 'center', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30, lineHeight: 20 },
  input: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  btn: { backgroundColor: '#e74c3c', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});