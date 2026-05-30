import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, typography, spacing } from '../src/theme';
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
  const { register, handleSubmit } = useForm();
  
  const onLogin = (data: any) => {
    console.log('data:', data);
  }
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
        style={{
          marginTop: spacing.lg,
          padding: spacing.sm,
          backgroundColor: colors.primary,
          borderRadius: 4,
        }}
        onPress={() => {
          handleSubmit(onLogin)();
        }}
      >
        <Text>Enviar form</Text>
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
