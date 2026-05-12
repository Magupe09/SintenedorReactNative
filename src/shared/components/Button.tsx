import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors, typography, radius, spacing } from '../../theme';

/**
 * 🔘 Button — Componente base reutilizable
 *
 * Variants: 'primary' | 'secondary' | 'outline' | 'danger'
 * Sizes:    'sm' | 'md' | 'lg'
 *
 * Sesión 0: Creamos el esqueleto.
 * Lo expandimos cuando necesitemos más variantes.
 */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  textStyle,
  ...pressableProps
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      disabled={isDisabled}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? colors.primary : colors.textOnPrimary}
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${variant}`],
            styles[`textSize_${size}`],
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

// ─── Estilos ──────────────────────────────────────────

const variantStyles = {
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.error,
  },
} as const satisfies Record<ButtonVariant, ViewStyle>;

const textVariantStyles = {
  primary: { color: colors.textOnPrimary },
  secondary: { color: colors.textOnPrimary },
  outline: { color: colors.primary },
  danger: { color: colors.textOnPrimary },
} as const satisfies Record<ButtonVariant, TextStyle>;

const sizeStyles = {
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  lg: {
    paddingVertical: spacing.md + 4,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
} as const satisfies Record<ButtonSize, ViewStyle>;

const textSizeStyles = {
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
} as const satisfies Record<ButtonSize, TextStyle>;

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ...variantStyles,
  ...sizeStyles,
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    ...typography.button,
  },
  ...Object.fromEntries(
    Object.entries(textVariantStyles).map(([k, v]) => [`text_${k}`, v])
  ),
  ...Object.fromEntries(
    Object.entries(textSizeStyles).map(([k, v]) => [`textSize_${k}`, v])
  ),
} as any);
