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

// ================================================
// DETALLE DE REUNIÓN (FUTURO / PASADO)
// ================================================

/**
 * Abre el modal de detalle de reunión.
 * @param {boolean} isFuture - true si la reunión es futura/en curso, false si es pasada
 * @param {string} title - Título de la reunión
 * @param {string} meta - Cadena con fecha, hora y equipo
 * @param {string[]} items - Objetivos (futuro) o ítems de checklist completados (pasado)
 */
function openMeetingDetail(isFuture, title, meta, items) {
  document.getElementById('mdTitle').textContent = title;

  // Meta con iconos de fecha/equipo
  document.getElementById('mdMeta').innerHTML =
    `<span style="display:flex;align-items:center;gap:5px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>${meta}</span>`;

  const futureSection = document.getElementById('mdFutureSection');
  const pastSection   = document.getElementById('mdPastSection');
  const joinBtn       = document.getElementById('mdJoinBtn');

  if (isFuture) {
    futureSection.style.display = '';
    pastSection.style.display   = 'none';
    joinBtn.style.display       = '';
    document.getElementById('mdObjectives').innerHTML = items.map(item =>
      `<div style="display:flex;gap:10px;align-items:flex-start;padding:9px 12px;background:var(--slate);border-radius:6px">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" stroke-width="2" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span style="font-size:13px">${item}</span>
      </div>`
    ).join('');
  } else {
    futureSection.style.display = 'none';
    pastSection.style.display   = '';
    joinBtn.style.display       = 'none';
    document.getElementById('mdChecklist').innerHTML = items.map(item =>
      `<div style="display:flex;gap:10px;align-items:flex-start;padding:9px 12px;background:var(--slate);border-radius:6px">
        <div style="width:16px;height:16px;min-width:16px;background:var(--green);border-radius:3px;display:flex;align-items:center;justify-content:center;margin-top:1px">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span style="font-size:13px;text-decoration:line-through;color:var(--muted)">${item}</span>
      </div>`
    ).join('');
  }

  openModal('meetingDetailModal');
}

// ================================================
// INVITAR ESTUDIANTE EXTERNO
// ================================================

/**
 * Filtra la lista de estudiantes externos según la búsqueda
 * @param {string} query - Texto de búsqueda
 */
function filterExternalStudents(query) {
  const items = document.querySelectorAll('.external-student-item');
  const q = query.toLowerCase().trim();
  items.forEach(item => {
    const name  = item.dataset.name.toLowerCase();
    const email = item.dataset.email.toLowerCase();
    item.style.display = (!q || name.includes(q) || email.includes(q)) ? '' : 'none';
  });
}

/**
 * Selecciona un estudiante externo de la lista
 * @param {HTMLElement} el - Elemento de la lista seleccionado
 */
function selectExternalStudent(el) {
  // Restablecer estilo de todos
  document.querySelectorAll('.external-student-item').forEach(item => {
    item.style.background   = '';
    item.style.borderColor  = 'var(--border)';
  });
  // Resaltar el seleccionado
  el.style.background  = 'rgba(59,130,246,0.08)';
  el.style.borderColor = 'var(--amber)';

  const selectedDiv = document.getElementById('externalStudentSelected');
  selectedDiv.style.display = '';
  document.getElementById('selectedStudentName').textContent =
    el.dataset.name + '  ·  ' + el.dataset.group;
}

// Limpiar estado del modal al cerrarlo
document.addEventListener('DOMContentLoaded', function() {
  const inviteModal = document.getElementById('inviteExternalModal');
  if (inviteModal) {
    inviteModal.addEventListener('click', function(e) {
      if (e.target === this) {
        // Reset al cerrar por overlay
        document.getElementById('externalSearchInput').value = '';
        filterExternalStudents('');
        document.getElementById('externalStudentSelected').style.display = 'none';
        document.querySelectorAll('.external-student-item').forEach(item => {
          item.style.background  = '';
          item.style.borderColor = 'var(--border)';
        });
      }
    });
  }
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
// FILTROS DE CALENDARIO Y VISTAS
// ================================================

function toggleFilter(btn, type) {
  btn.classList.toggle('on');
  const events = document.querySelectorAll(`.ev-${type}`);
  events.forEach(event => {
    event.style.display = btn.classList.contains('on') ? '' : 'none';
  });
}

function toggleViewFilter(btn) {
  const buttons = document.querySelectorAll('.view-filter');
  buttons.forEach(b => {
    b.classList.remove('active');
    b.style.background = 'var(--glass)';
    b.style.color = 'var(--text)';
    b.style.border = '1px solid var(--border)';
  });

  btn.classList.add('active');
  btn.style.background = 'var(--amber)';
  btn.style.color = 'var(--navy)';
  btn.style.border = 'none';

  const view = btn.dataset.view;
  const allDays = document.querySelectorAll('.cal-grid .cal-day');
  const allHeaders = document.querySelectorAll('.cal-grid .cal-day-header');
  const today = document.querySelector('.cal-day.today');

  // Mostrar todos por defecto
  allDays.forEach(day => day.classList.remove('hidden'));
  allHeaders.forEach(header => header.classList.remove('hidden'));

  if (!today) return;

  if (view === 'day') {
    const weekday = parseInt(today.dataset.weekday);
    allDays.forEach(day => day.classList.add('hidden'));
    today.classList.remove('hidden');

    allHeaders.forEach(header => {
      if (parseInt(header.dataset.weekday) !== weekday) {
        header.classList.add('hidden');
      }
    });
  } else if (view === 'week') {
    const allDaysArr = Array.from(allDays);
    const todayIndex = allDaysArr.indexOf(today);
    const start = todayIndex - (todayIndex % 7);
    const end = start + 7;
    allDaysArr.forEach((day, i) => {
      if (i < start || i >= end) day.classList.add('hidden');
    });
    allHeaders.forEach(header => header.classList.remove('hidden'));
  } else if (view === 'month') {
    // Todo visible
    allDays.forEach(day => day.classList.remove('hidden'));
    allHeaders.forEach(header => header.classList.remove('hidden'));
  }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  const monthBtn = document.querySelector('.view-filter[data-view="month"]');
  if (monthBtn) toggleViewFilter(monthBtn);
});
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
