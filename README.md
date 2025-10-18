# EvalSys - Plataforma Educativa de Programación

## 📁 Estructura del Proyecto

Crea la siguiente estructura de carpetas y archivos:

```
codeschool/
│
├── index.html
│
├── pages/
│   ├── problemas.html
│   ├── grupos.html
│   ├── proyectos.html
│   └── comunidad.html
│
├── components/
│   ├── header.html
│   ├── sidebar.html
│   └── footer.html
│
├── css/
│   ├── styles.css
│   ├── header.css
│   ├── sidebar.css
│   ├── footer.css
│   ├── cards.css
│   └── modals.css
│
├── js/
│   ├── main.js
│   ├── auth.js
│   ├── navigation.js
│   └── modals.js
│
└── data/
    ├── users.json
    ├── problems.json
    ├── groups.json
    └── projects.json
```

## 🚀 Instrucciones de Instalación

### Paso 1: Crear las Carpetas

1. Crea una carpeta principal llamada `codeschool`
2. Dentro de ella, crea las siguientes carpetas:
   - `pages`
   - `components`
   - `css`
   - `js`
   - `data`

### Paso 2: Crear los Archivos

Copia cada archivo proporcionado en su ubicación correspondiente según la estructura de arriba.

### Paso 3: Abrir el Proyecto

1. Abre el archivo `index.html` en tu navegador
2. **IMPORTANTE**: Necesitas un servidor local para que funcionen los componentes (fetch de HTML)

## 🖥️ Cómo Ejecutar con Servidor Local

### Opción 1: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 2: Python Simple Server
```bash
# Si tienes Python 3
python -m http.server 8000

# Luego abre en el navegador:
http://localhost:8000
```

### Opción 3: Node.js http-server
```bash
# Instala http-server globalmente
npm install -g http-server

# Ejecuta en la carpeta del proyecto
http-server

# Abre en el navegador la URL que aparece
```

## ✨ Características Principales

### 1. Sistema de Autenticación
- **Registro**: Los usuarios pueden crear cuentas según su tipo:
  - Estudiantes de Secundaria (requiere: nombre, colegio, código estudiantil, email, contraseña)
  - Estudiantes Universitarios (requiere: nombre, universidad, código estudiantil, email, contraseña)
  - Docentes (requiere: nombre, institución, email, contraseña)

- **Inicio de Sesión**: Requiere institución, código estudiantil, nombre y contraseña

### 2. Navegación
- **Inicio**: Vista general con problemas y grupos destacados
- **Problemas**: Lista de problemas de codificación con búsqueda y filtros
- **Grupos**: Grupos colaborativos por tipo de usuario
- **Proyectos**: Proyectos colaborativos en diferentes estados
- **Comunidad**: Estadísticas y miembros destacados

### 3. Funcionalidades Interactivas
- ✅ Crear problemas de programación
- ✅ Crear grupos (universidad, secundaria, mixtos)
- ✅ Crear proyectos colaborativos
- ✅ Filtrar por categoría, nivel y tipo de usuario
- ✅ Búsqueda en tiempo real
- ✅ Sistema de ordenamiento

### 4. Sidebar Dinámico
- Filtros por lenguaje de programación
- Filtros por nivel de dificultad
- Filtros por tipo de usuario

## 🎨 Personalización

### Cambiar Colores
Edita el archivo `css/styles.css` y modifica las variables de color:
```css
/* Colores principales */
--primary: #667eea;
--secondary: #764ba2;
```

### Agregar Más Datos
Edita los archivos JSON en la carpeta `data/` para agregar más:
- Problemas en `problems.json`
- Grupos en `groups.json`
- Proyectos en `projects.json`

## 📝 Funcionalidades por Implementar (Futuras)

- [ ] Backend real con base de datos
- [ ] Sistema de respuestas a problemas
- [ ] Chat en tiempo real
- [ ] Notificaciones
- [ ] Sistema de reputación
- [ ] Insignias y logros
- [ ] Perfil de usuario completo
- [ ] Subir archivos y código

## 🔧 Solución de Problemas

### Problema: Los componentes no se cargan
**Solución**: Asegúrate de estar usando un servidor local (no puedes abrir el HTML directamente desde el explorador de archivos)

### Problema: Los datos no aparecen
**Solución**: Verifica que los archivos JSON estén en la carpeta `data/` y tengan el formato correcto

### Problema: Los estilos no se aplican
**Solución**: Verifica que todas las rutas en los `<link>` de CSS sean correctas

## 📱 Responsive Design

La plataforma es totalmente responsive y se adapta a:
- 📱 Móviles (320px - 768px)
- 💻 Tablets (768px - 1024px)
- 🖥️ Desktop (1024px+)

## 🤝 Contribuir

Esta es una plataforma educativa de código abierto. Siéntete libre de:
- Agregar nuevas funcionalidades
- Mejorar el diseño
- Corregir bugs
- Agregar más datos de ejemplo

## 📄 Licencia

Proyecto educativo de código abierto.

---

**¡Disfruta construyendo tu comunidad de programación! 🚀**