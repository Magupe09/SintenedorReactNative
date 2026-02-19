import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, ScrollView, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [session, setSession] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Campos requeridos por tu DB
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Revisamos si ya hay alguien logueado al abrir la pantalla
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);
  async function handleAuth() {
    setLoading(true);
    setMensaje(''); // Limpiamos mensajes anteriores

    if (isRegistering) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { full_name: nombre, phone: telefono }
        }
      });

      if (error) {
        // CAPTURA DE CORREO EXISTENTE
        if (error.message.includes("already registered") || error.status === 422) {
          setMensaje("⚠️ Este correo ya está registrado. Intenta iniciar sesión.");
        } else {
          setMensaje("❌ " + error.message);
        }
      } else {
        // CASO EXITOSO
        if (data.user && data.session) {
          setMensaje("✅ ¡Registro exitoso! Entrando...");
          // El RootLayout se encargará de redirigir
        } else {
          setMensaje("📧 Registrado. ¡Revisa tu email para confirmar!");
        }
      }
    } else {
      // Lógica de Login (SignIn)
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMensaje("❌ Credenciales incorrectas");
    }
    setLoading(false);
  }

  async function loginConGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'tu-app-url://' } // Configurar después en Supabase
    });
    if (error) Alert.alert('Error Google', error.message);
  }

  async function cerrarSesion() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Error", error.message);
    // No necesitas redireccionar manualmente, el RootLayout lo hará por ti
  }

  // SI HAY SESIÓN: Mostramos el botón de salir
  if (session) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Cuenta</Text>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>
          Sesión iniciada como: {session.user.email}
        </Text>

        <Pressable style={styles.btnPrincipal} onPress={cerrarSesion}>
          <Text style={styles.btnText}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Crear Perfil' : 'Bienvenido'}</Text>

      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nombre Completo *"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono (WhatsApp) *"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.btnPrincipal} onPress={handleAuth} disabled={loading}>
        <Text style={styles.btnText}>
          {loading ? 'Procesando...' : (isRegistering ? 'Registrarme' : 'Entrar')}
        </Text>
      </Pressable>

      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.or}>o continúa con</Text>
        <View style={styles.line} />
      </View>

      <Pressable style={styles.btnGoogle} onPress={loginConGoogle}>
        <Text style={styles.btnTextGoogle}>G Google</Text>
      </Pressable>
       {mensaje ? <Text style={{ color: 'red', textAlign: 'center' }}>{mensaje}</Text> : null}
      <Pressable style={styles.switchBtn} onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {isRegistering ? '¿Ya tienes cuenta? Entra aquí' : '¿Nuevo? Crea tu perfil aquí'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#fff', flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#1a1a1a' },
  input: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  btnPrincipal: { backgroundColor: '#e74c3c', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  separator: { flexDirection: 'row', alignItems: 'center', marginVertical: 25 },
  line: { flex: 1, height: 1, backgroundColor: '#eee' },
  or: { marginHorizontal: 10, color: '#aaa', fontSize: 13 },
  btnGoogle: { backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  btnTextGoogle: { color: '#444', fontWeight: '600' },
  switchBtn: { marginTop: 25, alignItems: 'center' },
  switchText: { color: '#3498db', fontWeight: '500' }
});