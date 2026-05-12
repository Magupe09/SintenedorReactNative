# 🏍️ Kiosko.app

Plataforma multi-servicio para kiosko callejero en Bogotá.

- 🍕 Comida: pizzas, sándwiches, bebidas calientes
- 🔧 Taller: venta de partes de bicicleta, servicio a domicilio
- 📊 Admin: dashboard, gestión de staff, catálogo

## Stack

| Capa | Tecnología |
|------|-----------|
| App | Expo SDK 54 + React Native |
| Lenguaje | TypeScript |
| Navegación | Expo Router (file-based) |
| Backend | Supabase (auth, DB, realtime) |
| Estado | Zustand |
| Formularios | React Hook Form |
| UI | StyleSheet + tema propio |

## Empezar

```bash
cp .env.example .env.local
# Editar .env.local con credenciales de Supabase

npm install
npm start
```

## Arquitectura

```
src/
├── modules/
│   ├── food/       # Módulo de comida
│   ├── taller/     # Módulo de taller de bicis
│   └── admin/      # Dashboard y gestión
├── shared/
│   ├── components/ # UI reutilizable
│   ├── stores/     # Zustand stores
│   ├── services/   # Consultas Supabase
│   ├── hooks/      # Custom hooks
│   └── utils/      # Helpers
├── theme/          # Colores, tipografía, spacing
└── types/          # Tipos de Supabase + app
```

## Licencia

MIT
