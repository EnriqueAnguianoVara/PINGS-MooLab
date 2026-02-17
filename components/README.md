# MooLab - Estructura del Proyecto

Este proyecto ha sido refactorizado para mejorar la legibilidad y mantenibilidad del código.

## 📁 Estructura de Archivos

```
PINGS-MooLab/
├── index.html          # Archivo HTML principal (estructura y contenido)
├── css/
│   └── styles.css     # Estilos CSS organizados por secciones
├── js/
│   └── app.js         # Lógica JavaScript de la aplicación
├── components/
│   └── README.md      # Este archivo - documentación
└── logo.png           # Logo de la aplicación
```

## 🎨 Organización del CSS (css/styles.css)

El archivo CSS está organizado en las siguientes secciones:

1. **Variables CSS** - Colores y valores reutilizables
2. **Estilos Base** - Reset y configuración base
3. **Topbar** - Barra superior de navegación
4. **Layout** - Estructura general y sidebar
5. **Vistas** - Estilos para las diferentes vistas
6. **Dashboard** - Tarjetas de estadísticas, reuniones, tareas
7. **Calendar** - Calendario y filtros
8. **Repository** - Explorador de archivos
9. **Meeting Room** - Sala de videoconferencia
10. **Team** - Vista de equipo
11. **Notification Panel** - Panel de notificaciones
12. **Modales** - Estilos para ventanas modales
13. **Componentes** - Chips, scrollbar, tooltips, etc.

## 💻 Funcionalidades JavaScript (js/app.js)

El archivo JavaScript incluye:

### Navegación
- `setView(name, navBtn, sideBtn)` - Cambiar entre vistas
- Gestión de botones activos en navegación

### Sistema de Modales
- `openModal(modalId)` - Abrir modal
- `closeModal(modalId)` - Cerrar modal
- Cierre al hacer clic fuera del modal

### Panel de Notificaciones
- `toggleNotif()` - Mostrar/ocultar notificaciones
- Cierre automático al hacer clic fuera

### Tareas y Checklists
- `toggleTask(el)` - Marcar/desmarcar tareas
- `toggleCb(el)` - Toggle de checkboxes con símbolo

### Filtros de Calendario
- `toggleFilter(btn, type)` - Filtrar eventos por tipo
- `toggleViewFilter(btn)` - Cambiar vista (día/semana/mes)

### Controles de Reunión
- `toggleMic(btn)` - Activar/silenciar micrófono
- `toggleCamera(btn)` - Activar/desactivar cámara
- `toggleRecording(btn)` - Iniciar/detener grabación

### Atajos de Teclado
- **ESC** - Cerrar modales y notificaciones
- **Ctrl/Cmd + K** - Enfocar barra de búsqueda

### Temporizador
- Contador automático del tiempo de reunión

## 📝 Modales Disponibles en index.html

El archivo index.html contiene los siguientes modales:

1. **meetingModal** - Crear nueva reunión
2. **cancelMeetingModal** - Cancelar reunión existente
3. **createTeamModal** - Crear nuevo equipo
4. **joinTeamModal** - Solicitar unirse a equipo
5. **uploadFileModal** - Subir archivo al repositorio
6. **createFolderModal** - Crear carpeta de práctica
7. **commentFileModal** - Comentarios en archivos
8. **reportIncidentModal** - Reportar incidencia al profesor
9. **recordPermissionModal** - Solicitar permiso de grabación
10. **attendanceLogsModal** - Ver logs de asistencia
11. **whiteboardModal** - Pizarra compartida
12. **timerModal** - Temporizador de reunión
13. **participantsModal** - Gestionar participantes

Para abrir un modal, usar: `openModal('nombreDelModal')`
Para cerrar un modal, usar: `closeModal('nombreDelModal')`

## 📱 Vistas Principales

El sistema tiene 5 vistas principales:

1. **Dashboard** (`view-dashboard`) - Vista principal con resumen
2. **Calendar** (`view-calendar`) - Calendario de eventos
3. **Repository** (`view-repository`) - Gestor de archivos
4. **Meeting** (`view-meeting`) - Sala de reunión virtual
5. **Team** (`view-team`) - Gestión de equipos

## 🎨 Variables CSS Personalizables

Puedes personalizar los colores modificando las variables CSS en `css/styles.css`:

```css
:root {
  --navy: #ffffff;      /* Fondo principal */
  --amber: #3b82f6;     /* Color primario */
  --teal: #2ec4b6;      /* Color secundario */
  --rose: #e05c5c;      /* Alertas/errores */
  --green: #3ddc97;     /* Éxito */
  --text: #212529;      /* Texto principal */
  --muted: #6c757d;     /* Texto secundario */
}
```

## 🚀 Mejoras Implementadas

### Antes de la Refactorización
- ❌ 2098 líneas en un solo archivo HTML
- ❌ CSS y JavaScript mezclados con HTML
- ❌ Difícil de mantener y actualizar
- ❌ Sin separación de responsabilidades

### Después de la Refactorización
- ✅ Código separado en archivos especializados
- ✅ CSS organizado por secciones con comentarios claros
- ✅ JavaScript documentado con JSDoc
- ✅ Estructura modular y escalable
- ✅ Más fácil de mantener y actualizar
- ✅ Mejor rendimiento (cacheo de archivos CSS/JS)

## 📖 Cómo Usar

1. Abre `index.html` en tu navegador
2.Los estilos se cargan automáticamente desde `css/styles.css`
3. La funcionalidad se carga desde `js/app.js`
4. Todo funciona como antes, pero ahora es más fácil de mantener

## 🔧 Desarrollo Futuro

Para seguir mejorando el proyecto, considera:

- Separar los modales en componentes individuales
- Implementar un sistema de componentes reutilizables
- Añadir un preprocesador CSS (SASS/LESS)
- Considerar un framework como Vue.js o React para componentes dinámicos
- Implementar un bundler (Webpack/Vite) para optimización

## 📊 Métricas

- **Reducción de tamaño de index.html**: ~70% más pequeño
- **Archivos organizados**: 3 archivos principales (HTML, CSS, JS)
- **Comentarios añadidos**: Documentación completa en todos los archivos
- **Mantenibilidad**: Significativamente mejorada

---

**MooLab** - Sistema de Gestión de Equipos y Reuniones Académicas
