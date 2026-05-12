import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * 🏗️ Root Layout
 *
 * Sesión 0: Mínimo — solo el Stack y StatusBar.
 * Sesión 1: Agregamos AuthProvider + protección de rutas.
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
