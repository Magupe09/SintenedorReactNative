import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { supabase } from '../lib/supabase';
import { Link, useRouter } from 'expo-router'; // Cambié router por useRouter para mayor consistencia
import { useCart } from '../context/CartContext';

export default function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        // Ejecutamos ambas tareas al cargar
        verificarPerfilYProductos();
    }, []);

    async function verificarPerfilYProductos() {
        setLoading(true);
        
        // 1. Verificar sesión y perfil
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { data: perfil } = await supabase
                .from('profiles')
                .select('phone_number')
                .eq('id', user.id)
                .single();

            // Bloqueo de marketing: Si no hay teléfono, a la aduana
            if (!perfil || !perfil.phone_number) {
                router.replace('/completar-perfil');
                return; // Detenemos la ejecución aquí
            }
        }

        // 2. Cargar productos
        const { data: productosData } = await supabase.from('products').select('*');
        if (productosData) setProducts(productosData);
        
        setLoading(false);
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#ff6600" />
                <Text style={{ marginTop: 10 }}>Cargando menú...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Barra Superior */}
            <View style={styles.topBar}>
                <Text style={styles.logo}>🍕 Pizza App</Text>
                <Pressable onPress={() => router.push('/login')} style={styles.loginBtn}>
                    <Text style={styles.loginText}>Mi Cuenta</Text>
                </Pressable>
            </View>

            {/* Acceso rápido pedidos */}
            <Link href="/pedidos" asChild>
                <Pressable style={styles.btnPedidos}>
                    <Text style={styles.btnPedidosText}>Ver mis pedidos →</Text>
                </Pressable>
            </Link>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.pizzaName}>{item.name.toUpperCase()}</Text>
                            <Text style={styles.tag}>Personal 🍕</Text>
                        </View>

                        <Text style={styles.description}>{item.description}</Text>

                        <View style={styles.footerCard}>
                            <Text style={styles.price}>${item.price.toLocaleString()}</Text>

                            <Pressable
                                style={styles.addButton}
                                onPress={() => addToCart(item)}
                            >
                                <Text style={styles.addButtonText}>Agregar +</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
                ListFooterComponent={
                    <Pressable onPress={() => router.push('/admin')} style={{ marginTop: 20, padding: 20 }}>
                        <Text style={{ color: '#aaa', textAlign: 'center' }}>Acceso Admin</Text>
                    </Pressable>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8', paddingHorizontal: 20, paddingTop: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    logo: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    loginBtn: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 20 },
    loginText: { color: '#e74c3c', fontWeight: 'bold' },
    btnPedidos: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#eee' },
    btnPedidosText: { textAlign: 'center', fontWeight: 'bold', color: '#333' },
    card: {
        backgroundColor: '#fff', padding: 20, borderRadius: 15,
        marginBottom: 15, elevation: 3, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4
    },
    pizzaName: { fontSize: 18, fontWeight: 'bold', color: '#ff6600' },
    description: { fontSize: 14, color: '#666', marginVertical: 5 },
    price: { fontSize: 16, fontWeight: '600', color: '#2ecc71' },
    tag: {
        backgroundColor: '#ffeaa7', color: '#d35400',
        paddingHorizontal: 8, paddingVertical: 2,
        borderRadius: 5, fontSize: 12, fontWeight: 'bold', overflow: 'hidden'
    },
    footerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    addButton: { backgroundColor: '#ff6600', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10 },
    addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});