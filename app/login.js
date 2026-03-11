import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { useRouter, Link } from 'expo-router';

export default function LoginScreen() {
  const [session, setSession] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ===== NUEVOS ESTADOS PARA EL PERFIL =====
  const [editingProfile, setEditingProfile] = useState(false); // Para cambiar entre ver y editar
  const [user, setUser] = useState(null); // Datos del usuario logueado
  const [loadingProfile, setLoadingProfile] = useState(true); // Mientras carga el perfil
  
  // Estados para editar datos
  const [editNombre, setEditNombre] = useState('');
  const [editTelefono, setEditTelefono] = useState('');
  const [editFoto, setEditFoto] = useState('https://via.placeholder.com/150?text=Sin+Foto'); // Foto por defecto

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
      // Si hay sesión, traemos los datos del perfil
      if (session) {
        traerPerfilUsuario(session.user.id);
      } else {
        setLoadingProfile(false);
      }
    });
  }, []);

  // ===== NUEVA FUNCIÓN: Traer datos del perfil =====
  const traerPerfilUsuario = async (userId) => {
    try {
      setLoadingProfile(true);
      
      // Consultamos la tabla 'profiles' para obtener datos adicionales
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single(); // Traer un solo registro

      if (error) {
        console.log('Error al traer perfil:', error);
      } else if (data) {
        // Guardamos los datos en los estados de edición
        setUser(data);
        setEditNombre(data.full_name || '');
        setEditTelefono(data.phone || '');
        setEditFoto(data.avatar_url || 'https://via.placeholder.com/150?text=Sin+Foto');
      }
    } catch (err) {
      console.log('Error:', err);
    } finally {
      setLoadingProfile(false);
    }
  };
  // ===== NUEVA FUNCIÓN: Guardar cambios del perfil =====
  const guardarCambiosPerfil = async () => {
    try {
      setLoading(true);
      
      // Actualizamos la tabla 'profiles' con los nuevos datos
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editNombre,
          phone: editTelefono,
          avatar_url: editFoto
        })
        .eq('id', session.user.id);

      if (error) {
        Alert.alert('Error', 'No se pudo guardar los cambios: ' + error.message);
      } else {
        Alert.alert('Éxito', 'Perfil actualizado correctamente 🎉');
        // Actualizamos el estado user con los nuevos datos
        setUser({
          ...user,
          full_name: editNombre,
          phone: editTelefono,
          avatar_url: editFoto
        });
        setEditingProfile(false);
      }
    } catch (err) {
      Alert.alert('Error', 'Ocurrió un error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

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
        // CASO EXITOSO - Ahora creamos el perfil en la tabla profiles
        if (data.user) {
          // Insertamos en la tabla profiles con los datos del usuario
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                full_name: nombre,
                phone: telefono,
                avatar_url: null
              }
            ]);

          if (profileError) {
            console.log('Error al crear perfil:', profileError);
            setMensaje("⚠️ Perfil creado pero hubo un error al guardar datos. Intenta editar tu perfil.");
          } else if (data.session) {
            setMensaje("✅ ¡Registro exitoso! Entrando...");
          } else {
            setMensaje("📧 Registrado. ¡Revisa tu email para confirmar!");
          }
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

  // ===== SI HAY SESIÓN: Mostramos el perfil del usuario =====
  if (session) {
    // Mientras carga el perfil
    if (loadingProfile) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={{ marginTop: 10 }}>Cargando tu perfil...</Text>
        </View>
      );
    }

    // ===== VISTA: MOSTRANDO PERFIL (no editable) =====
    if (!editingProfile) {
      return (
        <ScrollView contentContainerStyle={styles.containerProfile}>
          {/* TITULO */}
          <Text style={styles.title}>👤 Mi Perfil</Text>

          {/* FOTO DEL USUARIO */}
          <View style={styles.fotoContainer}>
            <Image
              source={{ uri: user?.avatar_url || 'https://via.placeholder.com/150?text=Sin+Foto' }}
              style={styles.foto}
            />
          </View>

          {/* DATOS DEL USUARIO (solo lectura) */}
          <View style={styles.profileCard}>
            <Text style={styles.labelPerfil}>📧 Email</Text>
            <Text style={styles.valorPerfil}>{session.user.email}</Text>

            <Text style={styles.labelPerfil}>👤 Nombre</Text>
            <Text style={styles.valorPerfil}>{user?.full_name || 'No definido'}</Text>

            <Text style={styles.labelPerfil}>📱 Teléfono</Text>
            <Text style={styles.valorPerfil}>{user?.phone || 'No definido'}</Text>
          </View>

          {/* BOTÓN EDITAR */}
          <Pressable 
            style={styles.btnEditar} 
            onPress={() => setEditingProfile(true)}
          >
            <Text style={styles.btnText}>✏️ Editar Perfil</Text>
          </Pressable>

          {/* BOTÓN VER PEDIDOS */}
          <Link href="/pedidos" asChild>
            <Pressable style={styles.btnPedidos}>
              <Text style={styles.btnPedidosText}>📋 Ver mis pedidos</Text>
            </Pressable>
          </Link>

          {/* BARRA DE NAVEGACIÓN */}
          <View style={styles.navbar}>
            <Link href="/index" asChild>
              <Pressable style={styles.navBtn}>
                <Text style={styles.navText}>🏠</Text>
              </Pressable>
            </Link>
            <Link href="/carrito" asChild>
              <Pressable style={styles.navBtn}>
                <Text style={styles.navText}>🛒</Text>
              </Pressable>
            </Link>
            <Pressable style={[styles.navBtn, { backgroundColor: '#FF6B35' }]}>
              <Text style={[styles.navText, { color: '#fff' }]}>👤</Text>
            </Pressable>
          </View>

          {/* BOTÓN CERRAR SESIÓN */}
          <Pressable style={styles.btnCerrarSesion} onPress={cerrarSesion}>
            <Text style={styles.btnTextCerrar}>🚪 Cerrar Sesión</Text>
          </Pressable>
        </ScrollView>
      );
    }

    // ===== VISTA: EDITANDO PERFIL =====
    return (
      <ScrollView contentContainerStyle={styles.containerProfile}>
        <Text style={styles.title}>✏️ Editar Perfil</Text>

        {/* FOTO EDITABLE */}
        <View style={styles.fotoContainer}>
          <Image
            source={{ uri: editFoto }}
            style={styles.foto}
          />
        </View>

        {/* INPUT PARA CAMBIAR URL DE FOTO */}
        <TextInput
          style={styles.input}
          placeholder="URL de la foto"
          value={editFoto}
          onChangeText={setEditFoto}
        />

        {/* INPUT NOMBRE */}
        <TextInput
          style={styles.input}
          placeholder="Nombre Completo"
          value={editNombre}
          onChangeText={setEditNombre}
        />

        {/* INPUT TELÉFONO */}
        <TextInput
          style={styles.input}
          placeholder="Teléfono (WhatsApp)"
          value={editTelefono}
          onChangeText={setEditTelefono}
          keyboardType="phone-pad"
        />

        {/* BOTÓN GUARDAR */}
        <Pressable 
          style={styles.btnGuardar} 
          onPress={guardarCambiosPerfil}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? 'Guardando...' : '💾 Guardar Cambios'}
          </Text>
        </Pressable>

        {/* BOTÓN CANCELAR */}
        <Pressable 
          style={styles.btnCancelar} 
          onPress={() => setEditingProfile(false)}
        >
          <Text style={styles.btnTextCancelar}>❌ Cancelar</Text>
        </Pressable>
      </ScrollView>
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

      {/* BARRA DE NAVEGACIÓN */}
      <View style={styles.navbar}>
        <Link href="/index" asChild>
          <Pressable style={styles.navBtn}>
            <Text style={styles.navText}>🏠</Text>
          </Pressable>
        </Link>
        <Link href="/carrito" asChild>
          <Pressable style={styles.navBtn}>
            <Text style={styles.navText}>🛒</Text>
          </Pressable>
        </Link>
        <Pressable style={[styles.navBtn, { backgroundColor: '#FF6B35' }]}>
          <Text style={[styles.navText, { color: '#fff' }]}>👤</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#fff', flexGrow: 1, justifyContent: 'center' },
  containerProfile: { paddingBottom: 100, backgroundColor: '#f5f5f5', flexGrow: 1 },
  
  // TÍTULOS
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#1a1a1a', marginTop: 20 },
  
  // INPUTS
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee', marginHorizontal: 20 },
  
  // BOTONES PRINCIPALES
  btnPrincipal: { backgroundColor: '#FF6B35', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, marginHorizontal: 25 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  // BOTONES SECUNDARIOS
  btnGoogle: { backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ddd', marginHorizontal: 25 },
  btnTextGoogle: { color: '#444', fontWeight: '600' },
  
  // SEPARADORES
  separator: { flexDirection: 'row', alignItems: 'center', marginVertical: 25, marginHorizontal: 25 },
  line: { flex: 1, height: 1, backgroundColor: '#eee' },
  or: { marginHorizontal: 10, color: '#aaa', fontSize: 13 },
  
  // SWITCH ENTRE LOGIN/REGISTRO
  switchBtn: { marginTop: 25, alignItems: 'center' },
  switchText: { color: '#3498db', fontWeight: '500' },
  
  // ===== NUEVOS ESTILOS PARA EL PERFIL =====
  
  // FOTO DEL USUARIO
  fotoContainer: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
  foto: { width: 150, height: 150, borderRadius: 75, borderWidth: 4, borderColor: '#FF6B35' },
  
  // TARJETA DE PERFIL
  profileCard: { 
    backgroundColor: '#fff', 
    marginHorizontal: 20, 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  
  labelPerfil: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#666', 
    marginTop: 12, 
    marginBottom: 5 
  },
  
  valorPerfil: { 
    fontSize: 16, 
    color: '#333', 
    fontWeight: '500',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  
  // BOTONES DEL PERFIL
  btnEditar: { 
    backgroundColor: '#3498db', 
    padding: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  
  btnGuardar: { 
    backgroundColor: '#27ae60', 
    padding: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginHorizontal: 20,
    marginBottom: 12
  },
  
  btnCancelar: { 
    backgroundColor: '#e74c3c', 
    padding: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginHorizontal: 20,
    marginBottom: 20
  },
  
  btnTextCancelar: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  
  btnPedidos: { 
    backgroundColor: '#9b59b6', 
    padding: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginHorizontal: 20,
    marginBottom: 12
  },
  
  btnPedidosText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  
  btnCerrarSesion: { 
    backgroundColor: '#95a5a6', 
    padding: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 100
  },
  
  btnTextCerrar: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  
  // ===== BARRA DE NAVEGACIÓN =====
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20
  },
  
  navBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  
  navText: {
    fontSize: 24,
  }
});