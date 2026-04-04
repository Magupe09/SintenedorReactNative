# Estructura del Vault de Obsidian

> **Nota**: Esta estructura está diseñada para aprender React Native mientras construís MyDarkKitchen. La idea es que cada carpeta contenga conceptos teóricos linkeados con tu código real.

---

## 📁 Estructura de Carpetas

```
MyDarkKitchen-Vault/
│
├── 🎯 00-Objetivos/                    # Metas de aprendizaje
│   ├── Meta-Principal.md
│   ├── Roadmap-Principal.md
│   └── Progreso-General.md
│
├── 📚 01-Fundamentos/                  # Conceptos base de RN
│   ├── 01-React-Core/
│   │   ├── Que-es-React.md
│   │   ├── JSX.md
│   │   ├── Componentes.md
│   │   ├── Props.md
│   │   ├── Estado-y-State.md
│   │   └── Renderizado.md
│   ├── 02-Hooks/
│   │   ├── Introduccion-Hooks.md
│   │   ├── useState.md
│   │   ├── useEffect.md
│   │   ├── useContext.md
│   │   ├── useRef.md
│   │   └── Custom-Hooks.md
│   └── 03-Ciclo-de-Vida/
│       ├── Mounting.md
│       ├── Updating.md
│       └── Unmounting.md
│
├── 🧭 02-Navegacion/                    # Todo lo de navegación
│   ├── 01-React-Navigation/
│   │   ├── Introduccion.md
│   │   ├── Stack-Navigator.md
│   │   ├── Tab-Navigator.md
│   │   ├── Drawer-Navigator.md
│   │   └── Navigation-Types.md
│   ├── 02-Navegacion-Anidada.md
│   └── 03-Pasar-Datos-Entre-Pantallas.md
│
├── 📦 03-Gestion-de-Estado/             # State management
│   ├── 01-Introduccion-State.md
│   ├── 02-Context-API/
│   │   ├── Que-es-Context.md
│   │   ├── Crear-Context.md
│   │   ├── Provider.md
│   │   └── useContext-Hook.md
│   ├── 03-Props-Drilling.md
│   ├── 04-Zustand/
│   │   ├── Introduccion.md
│   │   └── Comparacion-Con-Others.md
│   └── 05-Redux-Overview.md
│
├── 🎨 04-UI-y-Estilos/                  # Componentes visuales
│   ├── 01-Stylesheet.md
│   ├── 02-Flexbox-en-RN.md
│   ├── 03-Componentes-Core/
│   │   ├── View-Text-Image.md
│   │   ├── Touchable-Functions.md
│   │   ├── ScrollView-FlatList.md
│   │   └── TextInput.md
│   ├── 04-React-Native-Elements.md
│   └── 05-Animaciones.md
│
├── 🔌 05-Backend-y-APIs/                # Conexión con el mundo exterior
│   ├── 01-Supabase/
│   │   ├── Que-es-Supabase.md
│   │   ├── Autenticacion.md
│   │   ├── Database.md
│   │   └── Realtime.md
│   ├── 02-REST-vs-GraphQL.md
│   ├── 03-Manejo-de-Errores.md
│   └── 04-Async-y-Promises.md
│
├── 🏗️ 06-Arquitectura/                  # Cómo estructurar el proyecto
│   ├── 01-Folder-Structure.md
│   ├── 02-Patrones-de-diseno/
│   │   ├── Container-Presentational.md
│   │   ├── Atomic-Design.md
│   │   └── Higher-Order-Components.md
│   ├── 03-Separation-of-Concerns.md
│   └── 04-MVVM-en-RN.md
│
├── 🔒 07-Autenticacion-y-Usuarios/       # Flujos de auth
│   ├── 01-Flujo-de-Auth.md
│   ├── 02-Session-Management.md
│   ├── 03-Roles-y-Permisos.md
│   └── 04-Proteccion-de-Rutas.md
│
├── 🛒 08-Modulos-de-Negocio/             # Features de tu app
│   ├── 01-Carrito/
│   │   ├── Logica-del-Carrito.md
│   │   ├── Estado-Global-del-Carrito.md
│   │   └── Persistencia-Local.md
│   ├── 02-Pedidos/
│   │   ├── Flujo-de-Pedido.md
│   │   ├── Estados-de-Pedido.md
│   │   └── Historial.md
│   ├── 03-Menu-y-Productos/
│   │   ├── Fetching-de-Productos.md
│   │   ├── Categorias.md
│   │   └── Variantes.md
│   └── 04-Admin/
│       ├── Panel-de-Admin.md
│       ├── Gestion-de-Pedidos.md
│       └── Gestion-de-Productos.md
│
├── 🐛 09-Debug-y-Testing/               # Mantenimiento
│   ├── 01-Debug-Basico.md
│   ├── 02-React-DevTools.md
│   ├── 03-Async-Debugging.md
│   ├── 04-Errores-Comunes.md
│   └── 05-Testing-Overview.md
│
├── 📱 10-Deployment-y-Publicacion/       # Faire deploy
│   ├── 01-Expo-Build.md
│   ├── 02-Generar-APK.md
│   ├── 03-App-Store.md
│   └── 04-Play-Store.md
│
├── 🔝 11-Aprendizaje-Profesional/        # Conceptos avanzados
│   ├── 01-TypeScript.md
│   ├── 02-Solid-Principles.md
│   ├── 03-Clean-Architecture.md
│   └── 04-Performance.md
│
├── 📝 00-Daily-Notes/                    # Notas día a día
│   └── Daily-Notes-Index.md
│
└── 🎓 Recursos/                          # Material externo
    ├── Documentacion-Oficial.md
    ├── Cursos-y-Tutoriales.md
    └── Comunidades.md
```

---

## 🧠 Cómo Usar Esta Estructura

### Principio Fundamental

> **Cada nota que escribas debe responder 3 preguntas**:
> 1. **Qué** estoy haciendo en el código
> 2. **Por qué** lo hago así
> 3. **Qué conceptos** de React Native estoy usando

### связь (Linking) entre Notas

Cuando escribas una nota sobre tu código:

```markdown
## Carrito de Compras

El componente `carrito.js` usa [[Context]] para manejar el estado global.
Cuando agregás un producto, se actualiza el array con [[useState]].
La navegación entre pantallas usa [[Stack-Navigator]].
```

### Flujo de Aprendizaje Recomendado

1. **Empezá por Fundamentos** (01-Fundamentos)
2. **Avanzá a Navegación** cuando necesites varias pantallas
3. **Gestioná Estado** cuando el props drilling se vuelva insostenible
4. **Conectá el Backend** cuando necesites persistencia real

### Ejemplo Práctico: Tu Login

```
📄 LoginFlow.md (en 07-Autenticacion-y-Usuarios)
├── Linkea con [[Que-es-Supabase]]
├── Linkea con [[Autenticacion]]
├── Linkea con [[Props]] (si pasás datos)
└── Linkea con [[Stack-Navigator]] (para redirigir)
```

---

## 🎯 Resumen Visual del Flujo de Aprendizaje

```
FUNDAMENTOS          NAVEGACIÓN              ESTADO              BACKEND
     │                    │                    │                   │
     ▼                    ▼                    ▼                   ▼
┌─────────┐        ┌──────────┐         ┌──────────┐       ┌──────────┐
│- JSX    │        │- Stack   │         │- Context │       │- Supabase│
│- Props  │───────▶│- Tab     │────────▶│- Zustand  │──────▶│- Auth    │
│- State  │        │- Drawer  │         │- Redux   │       │- DB      │
└─────────┘        └──────────┘         └──────────┘       └──────────┘
                                                                 │
                        ▲                                         │
                        │                                         ▼
                   ┌─────┴─────┐                            ┌──────────┐
                   │  CARRO    │◀──────────────────────────│  API     │
                   │  PEDIDOS  │                            │  REST    │
                   │  ADMIN    │                            └──────────┘
                   └───────────┘
```

---

## 📌 Tips de Gold

| Tips | Descripción |
|------|-------------|
| **Usa MOCs** | Crea notas "Map of Content" que agrupen temas relacionados |
| **Graph View** | Mirá el grafo visual para ver cómo se conectan los conceptos |
| **Daily Notes** | Escribí cada día qué aprendiste y qué problema solveaste |
| **Code Snippets** | Guardá ejemplos cortos de código que te sirvieron |
| **Errores** | Documentá errores que te agarraron cabeza — son oro puro |

---

> *"El conocimiento que no se documenta se pierde."*
> *El conocimiento que no se conecta no se entiende.*
