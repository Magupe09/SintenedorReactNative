/**
 * 🎨 Tema del Kiosko — colores corporativos
 */

export const colors = {
  // Primarios
  primary: '#FF6B35', // Naranja cálido — botones principales, acentos
  primaryDark: '#E55A2B',
  primaryLight: '#FF8C5A',

  // Secundarios
  secondary: '#2EC4B6', // Verde azulado — éxito, completado
  secondaryDark: '#25A99D',

  // Superficies
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F2F5',

  // Texto
  textPrimary: '#1A1A2E',
  textSecondary: '#6C757D',
  textMuted: '#ADB5BD',
  textOnPrimary: '#FFFFFF',

  // Estados
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',

  // Bordes
  border: '#DEE2E6',
  borderLight: '#E9ECEF',

  // Módulos (para diferenciar visualmente)
  food: '#FF6B35', // Mismo que primary — comida
  taller: '#2C3E50', // Gris oscuro azulado — taller
  admin: '#8E44AD', // Púrpura — admin
} as const;

export type ColorKey = keyof typeof colors;
