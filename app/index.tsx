import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { colors, typography, spacing } from '../src/theme';
import { useForm } from 'react-hook-form';
/**
 * 🏠 Pantalla de inicio — placeholder
 *
 * Sesión 0: Solo muestra que el proyecto compila.
 * Sesión 1: Reemplazamos por el login.
 */
export default function HomeScreen() {
  //const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

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
        {...register('email', { required:'Email is required' })}
      />
      {errors.email && <Text style={{ color: 'red' }}>{errors.email.message as string}</Text>}
     
      <TextInput
        style={{
          marginTop: spacing.lg,
          padding: spacing.sm,
          backgroundColor: colors.primary,
          borderRadius: 4,
        }}
        placeholder="contraseña"
        {...register('password', {required: 'Password is required' , minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
        secureTextEntry
      />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password.message as string}</Text>}
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
