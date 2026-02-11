import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';

export default function PantallaCarrito() {
    
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [enviando, setEnviando] = useState(false);

    const { cart, addToCart, removeFromCart } = useCart();

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const enviarPedido = async () => {
        if (!nombre.trim() || !telefono.trim()) {
            alert("⚠️ Necesitamos tu nombre y WhatsApp para el envío.");
            return;
        }

        setEnviando(true);
        const { error } = await supabase
            .from('orders')
            .insert([
                {
                    customer_name: nombre,
                    customer_phone: telefono,
                    total_amount: total,
                    status: 'pending',
                    pizza_details: cart.map(p => p.name).join(', ')
                }
            ]);

        if (error) {
            alert("Error: " + error.message);
            setEnviando(false);
        } else {
            alert(`¡Excelente ${nombre}! Recibimos tu pedido.`);
            router.replace('/');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
                <Text style={styles.header}>Finalizar Pedido 🍕</Text>

                {/* Sub-ventana de Resumen */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Resumen de tu orden</Text>
                    {cart.map((item, index) => (
                        <View key={item.id} style={styles.itemRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>${(item.price * item.quantity).toLocaleString()}</Text>
                            </View>

                            {/* CONTROLES DE CANTIDAD */}
                            <View style={styles.quantityControls}>
                                <Pressable
                                    style={styles.qtyButton}
                                    onPress={() => removeFromCart(item.id)}
                                >
                                    <Text style={styles.qtyText}>-</Text>
                                </Pressable>

                                <Text style={styles.qtyNumber}>{item.quantity}</Text>

                                <Pressable
                                    style={styles.qtyButton}
                                    onPress={() => addToCart(item)}
                                >
                                    <Text style={styles.qtyText}>+</Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total a pagar:</Text>
                        <Text style={styles.totalValue}>${total.toLocaleString()}</Text>
                    </View>
                </View>

                {/* Formulario de Datos */}
                <View style={styles.formContainer}>
                    <Text style={styles.formInstruction}>
                        Para garantizar el envío, por favor indícanos:
                    </Text>

                    <Text style={styles.label}>Tu nombre completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Juan Pérez"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.label}>WhatsApp de contacto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. 300 123 4567"
                        keyboardType="phone-pad"
                        value={telefono}
                        onChangeText={(text) => setTelefono(text.replace(/[^0-9]/g, ''))}
                    />
                </View>

                <Pressable
                    style={[styles.confirmButton, enviando && { opacity: 0.7 }]}
                    onPress={enviarPedido}
                    disabled={enviando}
                >
                    <Text style={styles.buttonText}>
                        {enviando ? "Procesando..." : "Confirmar y Enviar a Cocina"}
                    </Text>
                </Pressable>

                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backText}>← Volver al menú</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fdfdfd', paddingTop: 60, paddingHorizontal: 20 },
    header: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 20 },
    summaryCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 25,
        elevation: 2
    },
    summaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#ff6600' },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    itemName: { fontSize: 15, color: '#555' },
    itemPrice: { fontSize: 15, fontWeight: '600' },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
    totalLabel: { fontSize: 18, fontWeight: 'bold' },
    totalValue: { fontSize: 20, fontWeight: 'bold', color: '#2ecc71' },
    formContainer: { marginBottom: 30 },
    formInstruction: { fontSize: 15, color: '#666', marginBottom: 20, fontStyle: 'italic' },
    label: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 5 },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 15
    },
    confirmButton: { backgroundColor: '#ff6600', padding: 18, borderRadius: 12, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    backText: { textAlign: 'center', marginTop: 20, color: '#999', fontSize: 15 },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 5,
    },
    qtyButton: {
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    qtyText: { fontSize: 18, fontWeight: 'bold', color: '#ff6600' },
    qtyNumber: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
});