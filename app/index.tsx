import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing } from '../src/theme';

/**
 * 🏠 Pantalla de inicio — placeholder
 *
 * Sesión 0: Solo muestra que el proyecto compila.
 * Sesión 1: Reemplazamos por el login.
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🏍️</Text>
      <Text style={styles.title}>Kiosko.app</Text>
      <Text style={styles.subtitle}>Lienzo limpio. Listo para construir.</Text>
      <ActivityIndicator
        size="small"
        color={colors.primary}
        style={{ marginTop: spacing.lg }}
      />
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
