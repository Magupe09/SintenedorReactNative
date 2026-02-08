# 🍕 MyDarkKitchen

Una aplicación móvil moderna para gestionar pedidos de pizzería en tiempo real. Construida con React Native y Expo, integrada con Supabase para una base de datos en la nube.

## 📋 Descripción

MyDarkKitchen es una aplicación multiplataforma (iOS, Android y Web) diseñada para facilitar la gestión y visualización de pedidos de pizzería. La aplicación proporciona una interfaz intuitiva para consultar productos disponibles y gestionar el estado de los pedidos en tiempo real.

### Características Principales

- 📱 **Multiplataforma**: iOS, Android y Web
- ☁️ **Sincronización en tiempo real**: Base de datos en la nube con Supabase
- 🎨 **Interfaz moderna**: Diseño responsivo y amigable
- 🚀 **Rendimiento optimizado**: Carga rápida de productos y pedidos
- 🔄 **Gestión de estado**: Control eficiente con React Hooks
- 💾 **Almacenamiento local**: Async Storage para datos persistentes

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|---|---|---|
| **React** | 19.1.0 | Framework UI |
| **React Native** | 0.81.5 | Framework móvil |
| **Expo** | ~54.0.33 | Plataforma de desarrollo |
| **Expo Router** | ~6.0.23 | Navegación |
| **Supabase** | ^2.95.3 | Backend y base de datos |
| **AsyncStorage** | 2.2.0 | Almacenamiento local |

## 📁 Estructura del Proyecto

```
MyDarkKitchen/
├── app/                    # Código principal de la aplicación
│   ├── index.js           # Pantalla de inicio / Catálogo de productos
│   └── pedidos.js         # Pantalla de gestión de pedidos
├── lib/
│   └── supabase.js        # Configuración de Supabase
├── assets/                # Recursos (iconos, imágenes, splash)
├── app.json              # Configuración de Expo
├── package.json          # Dependencias del proyecto
└── index.js             # Punto de entrada
```

## 🚀 Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn
- Expo CLI (opcional pero recomendado)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/yourusername/MyDarkKitchen.git
   cd MyDarkKitchen
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o con yarn
   yarn install
   ```

3. **Configurar Supabase**
   - Crear un proyecto en [Supabase](https://supabase.com)
   - Copiar las credenciales (URL y API Key)
   - Crear un archivo `.env.local` en la raíz del proyecto:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Configurar base de datos**
   - Crear tabla `products` en Supabase con los siguientes campos:
     - `id` (UUID, primary key)
     - `nombre` (text)
     - `descripcion` (text)
     - `precio` (numeric)
     - `imagen_url` (text, opcional)

## 💻 Uso

### Desarrollo

**Iniciar servidor de desarrollo:**
```bash
npm start
```

**Ejecutar en plataformas específicas:**
```bash
# iOS (macOS solo)
npm run ios

# Android
npm run android

# Web
npm run web
```

Escanear el código QR con la app de Expo para vista previa en dispositivo.

### Compilación

Para generar builds de producción, utilizar EAS Build:
```bash
eas build --platform ios
eas build --platform android
```

## 📱 Pantallas

### Home / Catálogo
- Muestra listado de productos disponibles
- Carga desde Supabase en tiempo real
- Acceso directo a la sección de pedidos

### Pedidos
- Visualización de pedidos activos
- Detalles y estado de cada pedido
- Historial de pedidos

## 🔐 Seguridad

- Credenciales de Supabase protegidas con variables de entorno
- Validación de datos en cliente y servidor
- RLS (Row Level Security) recomendado en Supabase

## 📝 Desarrollo

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor de desarrollo |
| `npm run ios` | Ejecuta en simulador iOS |
| `npm run android` | Ejecuta en emulador Android |
| `npm run web` | Ejecuta en navegador web |

### Mejoras Futuras

- [ ] Sistema de autenticación de usuarios
- [ ] Carrito de compras
- [ ] Sistema de pagos integrado
- [ ] Notificaciones push
- [ ] Panel administrativo
- [ ] Estadísticas de ventas

## 🐛 Solución de Problemas

**Problema**: Error de conexión con Supabase
- **Solución**: Verificar variables de entorno y credenciales en Supabase

**Problema**: Dependencias no instaladas correctamente
- **Solución**: Eliminar `node_modules` y ejecutar `npm install` nuevamente

**Problema**: Error en simulador/emulador
- **Solución**: Ejecutar `expo doctor` para diagnosticar problemas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Tu Nombre / Equipo**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: tu.email@ejemplo.com

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios principales:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte, abre un issue en el repositorio o contacta al autor.

---

**Hecho con ❤️ para apasionados por la tecnología y la pizza 🍕**
