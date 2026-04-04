# 🍕 Plan de Trabajo: MyDarkKitchen

## Tu Situación Actual

Tenés un proyecto funcional con lo básico:
- ✅ Catálogo de productos (index.js)
- ✅ Login/Registro (login.js)
- ✅ Carrito de compras (carrito.js + CartContext)
- ✅ Pedidos del usuario (pedidos.js)
- ✅ Panel Admin (admin.js)

**Pero falta:**
- ❌ Protección de rutas (cualquiera puede ver el catálogo sin estar logueado)
- ❌ Base de datos optimizada para marketing digital
- ❌ Estructura escalable (todo en una carpeta)
- ❌ Mejores prácticas de React Native

---

## 🎯 Enfoque: Aprender Haciendo

No te voy a dar todo hecho. Voy a explicarte **POR QUÉ** cada cosa se hace así, para que aprendas el concepto y luego lo implementes.

### Conceptos Clave que Vas a Aprender

| Fase | Conceptos a Dominar |
|------|---------------------|
| 1 | React Hooks (useState, useEffect), Async/Await, Supabase Auth |
| 2 | Context API (state management), FlatList optimizado |
| 3 | Middleware/Protección de rutas, Lifecycle de React |
| 4 | Diseño de bases de datos relacionales, Row Level Security |
| 5 | Deployment, Performance, Offline support |

---

## 📋 Fases de Implementación

### Fase 1: Fundamentos y Protección de Rutas (Esta Semana)

**Objetivo:** Que cualquier ruta que no sea login/register requiera sesión activa.

**Lo que vas a aprender:**
- Cómo funciona el flujo de autenticación en React Native
- El ciclo de vida de un componente (mount, unmount)
- useEffect y sus dependencias

**Tareas:**
1. [ ] Crear un `AuthContext` que maneje el estado global de autenticación
2. [ ] Implementar protección en `_layout.js` para redirigir a login si no hay sesión
3. [ ] Verificar perfil completo antes de mostrar el catálogo

**Código conceptual (te lo explico, vos lo escribís):**

```javascript
// El patrón correcto de protección:
// 1. Layout raíz verifica auth ANTES de renderizar Stack
// 2. Si no hay sesión → login
// 3. Si hay sesión pero sin perfil → completar-perfil
// 4. Si todo OK → mostrar catálogo
```

---

### Fase 2: Base de Datos para Marketing Digital

**Objetivo:** Una base de datos que te permita analizar clientes, pedidos, y métricas de crecimiento.

**Lo que vas a aprender:**
- Diseño de esquemas relacionales
- Índices para rendimiento
- Row Level Security (RLS) en Supabase

**Estructura de Base de Datos Propuesta:**

```sql
-- TABLA: customers (perfiles de usuarios)
-- Esta tabla ya la tenés como 'profiles', pero vamos a enriquecerla
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    -- Campos importantes para MARKETING:
    referral_code TEXT UNIQUE,  -- Código de referido
    referred_by UUID REFERENCES profiles(id),  -- Quién lo referiró
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    customer_segment TEXT DEFAULT 'new', -- 'new', 'regular', 'vip'
    first_purchase_date DATE,
    last_purchase_date DATE,
    tags TEXT[],  -- Array de etiquetas: ['vegetariano', 'sin_gluten']
    marketing_consent BOOLEAN DEFAULT false
);

-- TABLA: products (tu menú)
CREATE TABLE products (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT,  -- 'pizzas', 'bebidas', 'postres', 'combos'
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,  -- Producto destacado
    preparation_time_minutes INT DEFAULT 15,
    created_at TIMESTAMP DEFAULT NOW(),
    -- Para marketing:
    times_ordered INT DEFAULT 0,  -- Contador de ventas
    tags TEXT[]
);

-- TABLA: orders (pedidos)
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id),
    customer_name TEXT,
    customer_phone TEXT,
    delivery_address TEXT,
    notes TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cooking', 'ready', 'delivered', 'cancelled'
    payment_method TEXT, -- 'efectivo', 'transferencia', 'MercadoPago'
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP,
    -- Métricas de marketing:
    source TEXT, -- 'app', 'web', 'referral'
    discount_applied DECIMAL(10,2) DEFAULT 0,
    coupon_code TEXT
);

-- TABLA: order_items (detalle de cada pedido)
CREATE TABLE order_items (
    id UUID PRIMARY KEY,
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    notes TEXT  -- Notas específicas del producto
);

-- TABLA: coupons (cupones de descuento)
CREATE TABLE coupons (
    code TEXT PRIMARY KEY,
    discount_type TEXT, -- 'percentage', 'fixed'
    discount_value DECIMAL(10,2),
    min_purchase DECIMAL(10,2),
    valid_from DATE,
    valid_until DATE,
    max_uses INT,
    times_used INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- TABLA: marketing_campaigns (campañas)
CREATE TABLE marketing_campaigns (
    id UUID PRIMARY KEY,
    name TEXT,
    description TEXT,
    target_segment TEXT,
    discount_code TEXT REFERENCES coupons(code),
    send_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**¿Por qué esta estructura?**
- **referral_code**: Sistema de referidos para crecimiento viral
- **customer_segment**: Para segmentar clientes (new/regular/vip) y dar ofertas personalizadas
- **tags en productos**: Para filtrar por preferencias (veggie, sin tacc)
- **order_items**: Permite análisis detallado (qué productos se venden juntos)
- **source**: Para saber de dónde viene cada pedido (app, web, referido)

---

### Fase 3: Estructura Escalable del Proyecto

**Objetivo:** Organizar el código para que no sea un bollo cuando crezca.

**Lo que vas a aprender:**
- Clean Architecture aplicado a React Native
- Separación de responsabilidades
- Custom Hooks

**Estructura proposta:**

```
MyDarkKitchen/
├── app/                      # Rutas (Expo Router)
│   ├── (auth)/               # Rutas que requieren auth
│   │   ├── index.js         # Catálogo (home)
│   │   ├── menu.js          # Menú detallado
│   │   ├── orders.js        # Mis pedidos
│   │   └── profile.js       # Mi perfil
│   ├── (public)/            # Rutas públicas
│   │   ├── login.js
│   │   └── register.js
│   ├── admin/               # Panel admin
│   │   ├── index.js
│   │   └── _layout.js
│   └── _layout.js          # Layout raíz
│
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/              # Buttons, Inputs, Cards genéricos
│   │   ├── product/        # Componentes de producto
│   │   └── cart/           # Componentes del carrito
│   │
│   ├── hooks/              # Custom Hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useOrders.js
│   │   └── useProducts.js
│   │
│   ├── services/           # Lógica de negocio
│   │   ├── supabase.js     # Configuración cliente
│   │   ├── authService.js
│   │   ├── orderService.js
│   │   └── productService.js
│   │
│   ├── context/            # Estado global
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   │
│   ├── utils/              # Utilidades
│   │   ├── formatters.js   # formatCurrency, formatDate
│   │   └── validators.js   # validatePhone, validateEmail
│   │
│   ├── constants/          # Constantes
│   │   ├── colors.js
│   │   └── config.js
│   │
│   └── types/              # TypeScript (si agregás TS)
│       └── index.ts
│
├── assets/
└── lib/
    └── supabase.js         # Cliente supabase
```

---

### Fase 4: Funcionalidades de Marketing

**Objetivo:** Herramientas para hacer crecer tu negocio.

**Lo que vas a aprender:**
- Realtime subscriptions en Supabase
- Notificaciones push (Expo Notifications)
- Deep linking

**Feature: Sistema de Referidos**

```javascript
// En tu AuthContext, después de registrar usuario:
// 1. Generar código único
// 2. Guardar quién lo referiró (si existe)
// 3. Dar descuento al referidor y al referido
```

**Feature: Notificaciones de Estado**

```javascript
// Suscribirse a cambios en orders
// Cuando el admin cambia estado → notificar al cliente
supabase
  .channel('orders')
  .on('postgres_changes', { 
    event: 'UPDATE', 
    schema: 'public', 
    table: 'orders',
    filter: `profile_id=eq.${user.id}` 
  }, (payload) => {
    // Mostrar notificación: "Tu pedido está listo!"
  })
  .subscribe();
```

**Feature: Cupones y Descuentos**

- Crear pantalla de "Canjeá tu cupón"
- Validar en el carrito antes de confirmar

---

### Fase 5: Mejoras UX y Performance

**Lo que vas a aprender:**
- Optimización de FlatList
- Memoización (useMemo, useCallback)
- Image caching
- Optimistic updates

---

## 📅 Cronograma Sugerido

| Semana | Focus | Entregable |
|--------|-------|------------|
| 1 | Auth + Protección de rutas | Usuario no logueado no puede ver menú |
| 2 | Base de datos marketing | Schema implementado en Supabase |
| 3 | Refactorización | Estructura src/ organizada |
| 4 | Marketing features | Referidos + cupones |
| 5 | Notifications | Notificaciones push |
| 6 | Optimización | Performance + testing |

---

## 🔑 Conceptos Clave que Necesitás Dominar

### 1. React Hooks Fundamentals

```javascript
// useState: Estado local
const [contador, setContador] = useState(0);

// useEffect: Efectos secundarios (cuando algo cambia)
useEffect(() => {
  console.log('El contador cambió a:', contador);
}, [contador]); // ← Dependencia: se ejecuta cuando contador cambia

// useEffect con cleanup (muy importante!)
useEffect(() => {
  const suscripcion = supabase.auth.onAuthStateChange(...);
  
  return () => {
    // Cleanup: cuando el componente se desmonta
    suscripcion.unsubscribe();
  };
}, []);
```

### 2. Context API (State Management)

```javascript
// Crear contexto
const MiContexto = createContext();

// Provider: envuelve la app y provee el estado
function MiProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  
  const login = async (email, password) => {
    const { data } = await supabase.auth.signInWithPassword({ email, password });
    setUsuario(data.user);
  };
  
  return (
    <MiContexto.Provider value={{ usuario, login }}>
      {children}
    </MiContexto.Provider>
  );
}

// Consumir contexto en cualquier componente
function MiComponente() {
  const { usuario, login } = useContext(MiContexto);
  // ...
}
```

### 3. Async/Await y Manejo de Errores

```javascript
// Malo (no manejas errores)
const datos = await fetch(url);
setData(datos);

// Bueno
try {
  setLoading(true);
  const { data, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  
  setData(data);
} catch (err) {
  console.error('Error inesperado:', err);
} finally {
  setLoading(false);
}
```

---

## 🎓 ¿Cómo Aprender Efectivamente?

1. **No copies y pegues sin entender**: Cada línea que copies, explicala en voz alta
2. **Rompe cosas a propósito**: Intentá breaking changes y ver cómo se rompen
3. **Lee la docs**: Expo Router, Supabase, React Native — todas tienen docs excelentes
4. **Haz preguntas**: Cuando no entiendas algo, perguntá

---

## 🔧 Problema Actual: ¿Por qué se renderiza primero el panel de login?

### El flujo actual

1. **Cuando cargás la web**, Expo Router intenta renderizar la ruta raíz (`/`)
2. El archivo `app/index.js` hace una verificación asyncrona:
   - Primero pide el usuario a Supabase: `supabase.auth.getUser()`
   - Luego consulta el perfil en la tabla `profiles`
   - Si no hay teléfono en el perfil, redirige a `/completar-perfil`

### El problema de timing

Mirá este código en `app/index.js` (líneas 18-43):

```javascript
async function verificarPerfilYProductos() {
    setLoading(true);
    
    const { data: { user } } = await supabase.auth.getUser(); // ← ASYNC

    if (user) {
        const { data: perfil } = await supabase
            .from('profiles')
            .select('phone_number')
            .eq('id', user.id)
            .single();

        if (!perfil || !perfil.phone_number) {
            router.replace('/completar-perfil'); // ← Solo redirige si está logueado
        }
    }
    // ...carga productos
}
```

**El problema**: mientras se ejecuta este código asyncrono, el componente YA se renderizó con `loading=true`. El usuario ve el spinner "Cargando menú..." por un instante, y si no está logueado... bueno, **nunca se redirige a ningún lado**.

### La solución

Para que el flujo sea correcto, necesitás un **middleware o protección de rutas**. En Expo Router 6 podés crear un `_layout.js` que haga redirect antes de renderizar cualquier cosa:

```javascript
// app/_layout.js (protección de rutas)
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                router.replace('/login');
            } else {
                // Verificar perfil completo
                const { data: perfil } = await supabase
                    .from('profiles')
                    .select('phone_number')
                    .eq('id', user.id)
                    .single();
                
                if (!perfil?.phone_number) {
                    router.replace('/completar-perfil');
                }
            }
            setLoading(false);
        }
        
        checkAuth();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ff6600" />
            </View>
        );
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
```

### Resumen

| Estado | Comportamiento actual |
|--------|----------------------|
| Sin sesión | Se muestra catálogo (pero no puede comprar) |
| Sesión sin perfil | Se muestra catálogo, no redirige automáticamente |
| Con sesión + perfil | Todo funciona |

---

## 📌 Próximo Paso Inmediato

Te propongo que arrancuemos con la **Fase 1: Protección de Rutas**. Es lo más urgente y te va a enseñar los fundamentos.

¿Querés que lo hagamos juntos? Te explico el concepto y vos escribís el código. Si te trabás, te ayudo.

**También necesito que me digas:**
1. ¿Tenés acceso a tu consola de Supabase?
2. ¿Querés que diseñe las tablas de marketing en SQL para que las copies directo?
3. ¿Hay algo específico que te dé más miedo o que no entiendas de React Native?
