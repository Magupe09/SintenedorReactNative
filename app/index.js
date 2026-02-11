import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { supabase } from '../lib/supabase';
import { Link } from 'expo-router';
import { useCart } from '../context/CartContext';

export default function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        async function getProducts() {
            const { data } = await supabase.from('products').select('*');
            if (data) setProducts(data);
            setLoading(false);
        }
        getProducts();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}><ActivityIndicator size="large" color="#ff6600" /></View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🍕 Mi Dark Kitchen</Text>
            <Link href="/pedidos" asChild>
                <Pressable style={{ backgroundColor: '#eee', padding: 10, borderRadius: 8, marginBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Ver mis pedidos →</Text>
                </Pressable>
            </Link>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8', paddingTop: 60, paddingHorizontal: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    card: {
        backgroundColor: '#fff', padding: 20, borderRadius: 15,
        marginBottom: 15, elevation: 3, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4
    },
    pizzaName: { fontSize: 18, fontWeight: 'bold', color: '#ff6600' },
    description: { fontSize: 14, color: '#666', marginVertical: 5 },
    price: { fontSize: 16, fontWeight: '600', color: '#2ecc71' },
    
    tag: {
        backgroundColor: '#ffeaa7',
        color: '#d35400',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 5,
        fontSize: 12,
        fontWeight: 'bold',
        overflow: 'hidden'
    },
    footerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    addButton: {
        backgroundColor: '#ff6600',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
    }
});