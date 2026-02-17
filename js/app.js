/**
 * MooLab — JavaScript Principal
 * Gestión de navegación, modales, interacciones y funcionalidades del sistema
 */

// ================================================
// NAVEGACIÓN ENTRE VISTAS
// ================================================

/**
 * Cambia entre las diferentes vistas de la aplicación
 * @param {string} name - Nombre de la vista (dashboard, calendar, repository, meeting, team)
 * @param {HTMLElement} navBtn - Botón de navegación clickeado (opcional)
 * @param {HTMLElement} sideBtn - Botón de sidebar clickeado (opcional)
 */
function setView(name, navBtn, sideBtn) {
  // Ocultar todas las vistas
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  
  // Mostrar la vista seleccionada
  document.getElementById('view-' + name).classList.add('active');

  // Actualizar estado activo del botón de navegación
  if (navBtn) {
    document.querySelectorAll('.nav-pill').forEach(b => b.classList.remove('active'));
    navBtn.classList.add('active');
  }

  //Actualizar estado activo del botón de sidebar
  if (sideBtn) {
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    sideBtn.classList.add('active');
  }

  // Cerrar panel de notificaciones al cambiar de vista
  document.getElementById('notifPanel').classList.remove('open');
}

// Manejar clics en los botones de navegación principal
document.querySelectorAll('.nav-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ================================================
// SISTEMA DE MODALES
// ================================================

/**
 * Abre un modal por su ID
 * @param {string} modalId - ID del modal a abrir
 */
function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Cierra un modal por su ID
 * @param {string} modalId - ID del modal a cerrar
 */
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic en el overlay (fuera del modal)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal(this.id);
    }
  });
});

// Alias para compatibilidad con código antiguo
function openMeetingModal() { 
  openModal('meetingModal'); 
}

function closeMeetingModal() { 
  closeModal('meetingModal'); 
}

// ================================================
// PANEL DE NOTIFICACIONES
// ================================================

/**
 * Alterna la visibilidad del panel de notificaciones
 */
function toggleNotif() {
  document.getElementById('notifPanel').classList.toggle('open');
}

// Cerrar panel de notificaciones al hacer clic fuera
document.addEventListener('click', function(e) {
  const notifPanel = document.getElementById('notifPanel');
  const notifBtn = document.querySelector('.notif-btn');
  
  if (!notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
    notifPanel.classList.remove('open');
  }
});

// ================================================
// TAREAS Y CHECKLISTS
// ================================================

/**
 * Marca/desmarca una tarea como completada
 * @param {HTMLElement} el - Elemento checkbox de la tarea
 */
function toggleTask(el) {
  el.classList.toggle('done');
  const txt = el.nextElementSibling;
  txt.classList.toggle('done');
}

/**
 * Marca/desmarca un checkbox con símbolo de check
 * @param {HTMLElement} el - Elemento checkbox
 */
function toggleCb(el) {
  el.classList.toggle('done');
  if (el.classList.contains('done')) {
    el.textContent = '✓';
  } else {
    el.textContent = '';
  }
  const txt = el.nextElementSibling;
  txt.classList.toggle('done');
}

// ================================================
// FILTROS DE CALENDARIO
// ================================================

/**
 * Alterna el estado de un chip de filtro
 * @param {HTMLElement} el - Elemento chip
 */
function toggleChip(el) {
  el.classList.toggle('on');
}

/**
 * Filtra eventos del calendario por tipo
 * @param {HTMLElement} btn - Botón de filtro clickeado
 * @param {string} type - Tipo de evento (meeting, class, task)
 */
function toggleFilter(btn, type) {
  btn.classList.toggle('on');
  
  // Obtener todos los eventos del tipo especificado
  const events = document.querySelectorAll(`.ev-${type}`);
  
  // Mostrar u ocultar según el estado del filtro
  if (btn.classList.contains('on')) {
    events.forEach(event => event.style.display = '');
  } else {
    events.forEach(event => event.style.display = 'none');
  }
}

/**
 * Cambia la vista del calendario (día/semana/mes)
 * @param {HTMLElement} btn - Botón de vista clickeado
 */
function toggleViewFilter(btn) {
  // Remover clase active de todos los botones de vista
  document.querySelectorAll('.view-filter').forEach(b => {
    b.style.background = 'var(--glass)';
    b.style.color = 'var(--text)';
    b.style.border = '1px solid var(--border)';
    b.classList.remove('active');
  });
  
  // Activar el botón clickeado
  btn.style.background = 'var(--amber)';
  btn.style.color = 'var(--navy)';
  btn.style.border = 'none';
  btn.classList.add('active');
  
  // Obtener la vista seleccionada
  const view = btn.dataset.view;
  console.log(`Vista del calendario cambiada a: ${view}`);
  
  // TODO: Implementar lógica para cambiar realmente la vista del calendario
}

// ================================================
// CONTROLES DE SALA DE REUNIÓN
// ================================================

// Estados de los controles de reunión
let micMuted = true;
let cameraOn = true;
let recording = false;

/**
 * Alterna el estado del micrófono
 * @param {HTMLElement} btn - Botón de micrófono
 */
function toggleMic(btn) {
  micMuted = !micMuted;
  if (micMuted) {
    btn.classList.add('ctrl-muted-btn');
    btn.classList.remove('ctrl-active');
  } else {
    btn.classList.remove('ctrl-muted-btn');
    btn.classList.add('ctrl-active');
  }
}

/**
 * Alterna el estado de la cámara
 * @param {HTMLElement} btn - Botón de cámara
 */
function toggleCamera(btn) {
  cameraOn = !cameraOn;
  if (cameraOn) {
    btn.classList.add('ctrl-active');
    btn.classList.remove('ctrl-default');
  } else {
    btn.classList.remove('ctrl-active');
    btn.classList.add('ctrl-default');
  }
}

/**
 * Alterna el estado de grabación
 * @param {HTMLElement} btn - Botón de grabación
 */
function toggleRecording(btn) {
  recording = !recording;
  if (recording) {
    btn.classList.add('ctrl-active');
    btn.style.background = 'var(--rose)';
    btn.style.color = '#fff';
  } else {
    btn.classList.remove('ctrl-active');
    btn.style.background = '';
    btn.style.color = '';
  }
}

// ================================================
// ATAJOS DE TECLADO
// ================================================

document.addEventListener('keydown', function(e) {
  // ESC para cerrar modales y notificaciones
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(modal => {
      closeModal(modal.id);
    });
    document.getElementById('notifPanel').classList.remove('open');
  }
  
  // Ctrl/Cmd + K para enfocar barra de búsqueda
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
      searchInput.focus();
    }
  }
});

// ================================================
// INICIALIZACIÓN Y EVENTOS
// ================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Hacer clickeables las tarjetas de reuniones
  document.querySelectorAll('.meeting-item').forEach(item => {
    const joinBtn = item.querySelector('.meeting-join');
    if (joinBtn) {
      joinBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        setView('meeting', null, null);
      });
    }
  });

  // Animación de indicador de mano levantada
  const handRaisedIndicators = document.querySelectorAll('.hand-raised-indicator');
  handRaisedIndicators.forEach(indicator => {
    setInterval(() => {
      indicator.style.transform = indicator.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
    }, 500);
  });

  console.log('🐮 MooLab UI cargada correctamente');
  console.log('💡 Atajos: ESC (cerrar), Ctrl+K (buscar)');
});

// ================================================
// TEMPORIZADOR DE REUNIÓN (DEMO)
// ================================================

let meetingSeconds = 1421; // 23:41 (tiempo inicial de demo)

setInterval(() => {
  meetingSeconds++;
  const hours = Math.floor(meetingSeconds / 3600);
  const mins = Math.floor((meetingSeconds % 3600) / 60);
  const secs = meetingSeconds % 60;
  const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  // Actualizar todos los elementos que muestran el temporizador
  const timerDisplays = document.querySelectorAll('.meeting-timer, #timerModal .font-family');
  timerDisplays.forEach(display => {
    if (display) {
      display.textContent = timeStr;
    }
  });
}, 1000);
