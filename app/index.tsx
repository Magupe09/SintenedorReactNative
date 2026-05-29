import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { colors, typography, spacing } from '../src/theme';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
/**
 * 🏠 Pantalla de inicio — placeholder
 *
 * Sesión 0: Solo muestra que el proyecto compila.
 * Sesión 1: Reemplazamos por el login.
 */
export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [contador, setContador] = useState(0);
  const { register, setValue } = useForm();
  console.log('contador:', contador);

  return (
    
    <View style={styles.container}>
      <Text style={styles.emoji}>🏍️</Text>
      <TextInput

        style={{
          marginTop: spacing.lg,
          padding: spacing.sm,
          backgroundColor: colors.primary,
          borderRadius: 4,
        }}
        placeholder="correo"
        {...register('email')}
      />
      <TextInput
        style={{
          marginTop: spacing.lg,
          padding: spacing.sm,
          backgroundColor: colors.primary,
          borderRadius: 4,
        }}
        placeholder="contraseña"
        {...register('password')}
        secureTextEntry
      />
      <Pressable
        onPress={() => {
          setContador((prev) => prev + 1);
          console.log('Contador incrementado');
        }}
        style={{
          marginTop: spacing.lg,
          padding: spacing.sm,
          backgroundColor: colors.primary,
          borderRadius: 4,
        }}
      >
        <Text>Incrementar Contador</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setContador((prev) => (prev > 0 ? prev - 1 : 0));
          console.log('Contador decrementado');
        }}
        style={{
          marginTop: spacing.lg,
          padding: spacing.sm,
          backgroundColor: colors.primary,
          borderRadius: 4,
        }}
      >
        <Text>Decrementar Contador</Text>
      </Pressable>
      
      <Text key={contador}>Contador: {contador}</Text>
      <Text style={styles.title}>Kiosko.app</Text>
      <Text style={styles.subtitle}>Lienzo limpio. Listo para construir.</Text>
      {isLoading ? 
        <ActivityIndicator
          size="small"
          color={colors.primary}
          style={{ marginTop: spacing.lg }}
      /> : <Text style={{ marginTop: spacing.lg, color: colors.primary }}>
          Cargando...
        </Text>
      }
      <Pressable
        onPress={() => setIsLoading(!isLoading)}
        style={{
          marginTop: spacing.lg,
          padding: spacing.sm,
          backgroundColor: colors.primary,
          borderRadius: 4,
        }}
      >
        <Text>{isLoading ? 'Detener Carga' : 'Iniciar Carga'}</Text>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
