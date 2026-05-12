/**
 * 📐 Escala tipográfica — optimizada para tablet
 * Los tamaños son más grandes de lo normal porque se usa en tablet
 */

import { TextStyle } from 'react-native';

export const typography = {
  // Headings
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  } as TextStyle,

  h2: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  } as TextStyle,

  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,

  // Body
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  } as TextStyle,

  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  } as TextStyle,

  // Small / Caption
  caption: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  } as TextStyle,

  captionBold: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  } as TextStyle,

  // Buttons
  button: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  } as TextStyle,

  buttonLarge: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  } as TextStyle,

  // Special
  price: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  } as TextStyle,

  mono: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'monospace',
    lineHeight: 20,
  } as TextStyle,
} as const;

export type TypographyKey = keyof typeof typography;
