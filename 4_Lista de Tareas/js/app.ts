import { listadoApuntes } from "./listado_apuntes";
import { abrirPopup, cerrarPopup } from "./pop-up";

// Referencias a elementos del DOM
const form = document.getElementById('formulario') as HTMLFormElement;
const inputTitulo = document.getElementById('titulo2') as HTMLInputElement;
const inputDescripcion = document.getElementById('texto') as HTMLInputElement;
const tareasContainer = document.getElementById('lista-tareas') as HTMLDivElement;
const estadoTareas = document.getElementById('estadoTareas') as HTMLSelectElement;

// Array para almacenar todas las tareas
let tareas: listadoApuntes[] = [];

/**
 * Inicializa la aplicación cargando datos de ejemplo
 */
function inicializarApp(): void {
  // Carga datos de ejemplo
  cargarDatosIniciales();
  
  // Configura los event listeners
  configurarEventListeners();
  
  // Renderiza las tareas iniciales
  renderizarTareas();
}

/**
 * Carga datos iniciales de ejemplo
 */
function cargarDatosIniciales(): void {
  // Ejemplo de tarea inicial
  const tareaInicial = new listadoApuntes('Compra de la semana', 'Recoger la compra del supermercado');
  tareaInicial.categoria = 'Tarea';
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 2); // Fecha para dentro de 2 días
  tareaInicial.fechaHora = fecha;
  tareas.push(tareaInicial);
  
  // Segunda tarea de ejemplo
  const tareaInicial2 = new listadoApuntes('Estudiar TypeScript', 'Repasar conceptos básicos de TypeScript');
  tareaInicial2.categoria = 'Escuela';
  tareaInicial2.completada = true;
  tareas.push(tareaInicial2);
  
  // Aquí se podrían cargar tareas desde localStorage si se implementa persistencia
  cargarTareasDesdeLocalStorage();
}

/**
 * Configura todos los event listeners de la aplicación
 */
function configurarEventListeners(): void {
  // Evento para manejar el envío del formulario
  form.addEventListener('submit', agregarNuevaTarea);
  
  // Evento para filtrar por estado de tareas
  estadoTareas.addEventListener('change', renderizarTareas);
  
  // Delegación de eventos para el contenedor de tareas
  tareasContainer.addEventListener('click', manejarEventosTareas);
  
  // Delegación de eventos para cambios en select y fechas
  tareasContainer.addEventListener('change', manejarCambiosTareas);
}

/**
 * Maneja el evento de envío del formulario para agregar una nueva tarea
 */
function agregarNuevaTarea(e: Event): void {
  e.preventDefault();
  
  // Obtiene los valores de los campos del formulario
  const titulo = inputTitulo.value.trim();
  const descripcion = inputDescripcion.value.trim();

  // Verifica que ambos campos tengan contenido
  if (titulo && descripcion) {
    // Crea una nueva tarea usando la clase listadoApuntes
    const nuevaTarea = new listadoApuntes(titulo, descripcion);
    
    // Agrega la tarea al array
    tareas.push(nuevaTarea);
    
    // Guarda en localStorage
    guardarTareasEnLocalStorage();
    
    // Actualiza la vista
    renderizarTareas();
    
    // Limpia los campos del formulario
    inputTitulo.value = '';
    inputDescripcion.value = '';
    
    // Cierra el popup
    cerrarPopup();
  }
}

/**
 * Renderiza todas las tareas en el DOM según el filtro seleccionado
 */
function renderizarTareas(): void {
  // Limpia el contenedor de tareas
  tareasContainer.innerHTML = '';
  
  // Obtiene el filtro seleccionado
  const filtro = estadoTareas.value;
  
  // Filtra las tareas según el estado seleccionado
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'completadas') {
      return tarea.completada;
    } else if (filtro === 'noCompletada') {
      return !tarea.completada;
    }
    return true; // Por defecto muestra todas
  });
  
  // Itera sobre las tareas filtradas
  tareasFiltradas.forEach((tarea, index) => {
    // Crea un elemento para la tarea
    const tareaElemento = crearElementoTarea(tarea, index);
    
    // Agrega la tarea al contenedor
    tareasContainer.appendChild(tareaElemento);
  });
}

/**
 * Crea un elemento DOM para una tarea
 */
function crearElementoTarea(tarea: listadoApuntes, index: number): HTMLDivElement {
  // Crea un nuevo div para la tarea
  const tareaElemento = document.createElement('div');
  tareaElemento.classList.add('tarea');
  if (tarea.completada) {
    tareaElemento.classList.add('completada');
  }
  tareaElemento.dataset.id = tarea.id.toString();
  tareaElemento.dataset.index = tareas.indexOf(tarea).toString();
  
  // Formatea la fecha si existe
  let fechaValor = '';
  if (tarea.fechaHora) {
    const fecha = tarea.fechaHora;
    // Formato YYYY-MM-DDThh:mm requerido por input datetime-local
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');
    fechaValor = `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  
  // Agrega el contenido de la tarea
  tareaElemento.innerHTML = `
    <div class="linea"></div>
    <button class="elemento_eliminar--btn" data-action="eliminar">
      <ion-icon name="trash-outline"></ion-icon>
    </button>
    <input rel="nofollow" type="text" name="titulo" value="${tarea.titulo}" readonly/>
    <textarea style="display: none;" rel="nofollow" name="descripcion" readonly>${tarea.descripcion}</textarea>
    <input type="checkbox" name="check" class="check" title="Marcar Completada" data-action="completar" ${tarea.completada ? 'checked' : ''}/>
    <select class="categorias" data-action="categoria">
      <option value="" disabled ${!tarea.categoria ? 'selected' : ''}>Categoría</option>
      <option value="tarea" ${tarea.categoria === 'Tarea' ? 'selected' : ''}>Tarea</option>
      <option value="cocina" ${tarea.categoria === 'Cocina' ? 'selected' : ''}>Cocina</option>
      <option value="escuela" ${tarea.categoria === 'Escuela' ? 'selected' : ''}>Escuela</option>
      <option value="trabajo" ${tarea.categoria === 'Trabajo' ? 'selected' : ''}>Trabajo</option>
      <option value="otro" ${tarea.categoria === 'Otro' ? 'selected' : ''}>Otro</option>
    </select>
    <input type="datetime-local" name="fechaHora" data-action="fecha" value="${fechaValor}"/>
    <button class="elemento_modificar--btn" title="Modificar" data-action="modificar">
      <ion-icon name="create-outline"></ion-icon>
    </button>
    <br />
    <div class="linea"></div>
  `;
  
  return tareaElemento;
}

/**
 * Maneja los eventos de clic en los elementos dentro de las tareas (delegación de eventos)
 */
function manejarEventosTareas(e: Event): void {
  const target = e.target as HTMLElement;
  const accion = target.dataset.action || (target.closest('[data-action]') as HTMLElement)?.dataset.action;
  
  if (!accion) return;
  
  // Busca el elemento padre que representa la tarea
  const tareaElemento = target.closest('.tarea') as HTMLDivElement;
  if (!tareaElemento) return;
  
  const index = parseInt(tareaElemento.dataset.index || '-1');
  
  switch (accion) {
    case 'eliminar':
      eliminarTarea(index);
      break;
    case 'modificar':
      modificarTarea(index);
      break;
    case 'completar':
      toggleCompletarTarea(index, (target as HTMLInputElement).checked);
      break;
  }
}

/**
 * Maneja los eventos de cambio en selects y otros inputs
 */
function manejarCambiosTareas(e: Event): void {
  const target = e.target as HTMLElement;
  const accion = target.dataset.action;
  
  if (!accion) return;
  
  // Busca el elemento padre que representa la tarea
  const tareaElemento = target.closest('.tarea') as HTMLDivElement;
  if (!tareaElemento) return;
  
  const index = parseInt(tareaElemento.dataset.index || '-1');
  if (index < 0 || index >= tareas.length) return;
  
  const tarea = tareas[index];
  
  switch (accion) {
    case 'categoria':
      const selectCategoria = target as HTMLSelectElement;
      tarea.categoria = selectCategoria.value;
      guardarTareasEnLocalStorage();
      break;
    case 'fecha':
      const inputFecha = target as HTMLInputElement;
      tarea.fechaHora = inputFecha.value ? new Date(inputFecha.value) : null;
      guardarTareasEnLocalStorage();
      break;
    case 'completar':
      const checkCompletada = target as HTMLInputElement;
      toggleCompletarTarea(index, checkCompletada.checked);
      break;
  }
}

/**
 * Elimina una tarea del array y actualiza la vista
 */
function eliminarTarea(index: number): void {
  if (index >= 0 && index < tareas.length) {
    tareas.splice(index, 1);
    guardarTareasEnLocalStorage();
    renderizarTareas();
    console.log('Tarea eliminada');
  }
}

/**
 * Modifica una tarea existente
 */
function modificarTarea(index: number): void {
  if (index >= 0 && index < tareas.length) {
    const tarea = tareas[index];
    
    // Abre el popup de edición
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    
    if (popup && overlay && inputTitulo && inputDescripcion) {
      // Rellena el formulario con los datos de la tarea
      inputTitulo.value = tarea.titulo;
      inputDescripcion.value = tarea.descripcion;
      
      // Guarda el índice de la tarea que se está editando
      form.dataset.editIndex = index.toString();
      
      // Modifica el evento submit para actualizar en lugar de crear
      const originalSubmitHandler = form.onsubmit;
      form.onsubmit = function(e) {
        e.preventDefault();
        const editIndex = parseInt(form.dataset.editIndex || '-1');
        
        if (editIndex >= 0 && editIndex < tareas.length) {
          // Actualiza la tarea existente
          tareas[editIndex].titulo = inputTitulo.value.trim();
          tareas[editIndex].descripcion = inputDescripcion.value.trim();
          
          // Guarda y actualiza la vista
          guardarTareasEnLocalStorage();
          renderizarTareas();
          
          // Limpia y cierra
          inputTitulo.value = '';
          inputDescripcion.value = '';
          cerrarPopup();
          
          // Restaura el manejador original
          form.onsubmit = originalSubmitHandler;
          delete form.dataset.editIndex;
        }
      };
      
      // Muestra el popup
      popup.style.display = 'block';
      overlay.style.display = 'block';
    }
  }
}

/**
 * Marca/desmarca una tarea como completada
 */
function toggleCompletarTarea(index: number, completada: boolean): void {
  if (index >= 0 && index < tareas.length) {
    // Actualiza el estado de la tarea
    tareas[index].completada = completada;
    
    // Actualiza la clase CSS del elemento
    const tareaElemento = document.querySelector(`.tarea[data-index="${index}"]`) as HTMLDivElement;
    if (tareaElemento) {
      if (completada) {
        tareaElemento.classList.add('completada');
      } else {
        tareaElemento.classList.remove('completada');
      }
    }
    
    // Guarda en localStorage
    guardarTareasEnLocalStorage();
    
    // Si el filtro está activo, puede que necesitemos actualizar la vista
    if (estadoTareas.value !== 'todas') {
      renderizarTareas();
    }
  }
}

/**
 * Guarda las tareas en localStorage
 */
function guardarTareasEnLocalStorage(): void {
  try {
    // Convertir las tareas a un formato serializable
    const tareasSerializables = tareas.map(tarea => ({
      id: tarea.id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completada: tarea.completada,
      categoria: tarea.categoria,
      fechaHora: tarea.fechaHora ? tarea.fechaHora.toISOString() : null
    }));
    
    localStorage.setItem('tareas', JSON.stringify(tareasSerializables));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
}

/**
 * Carga las tareas desde localStorage
 */
function cargarTareasDesdeLocalStorage(): void {
  try {
    const tareasGuardadas = localStorage.getItem('tareas');
    
    if (tareasGuardadas) {
      const tareasParseadas = JSON.parse(tareasGuardadas);
      
      // Reinicia el contador de tareas
      listadoApuntes.contadorListas = 0;
      
      // Convierte los objetos planos a instancias de listadoApuntes
      tareas = tareasParseadas.map((t: any) => {
        const tarea = new listadoApuntes(t.titulo, t.descripcion);
        tarea.completada = t.completada;
        tarea.categoria = t.categoria;
        tarea.fechaHora = t.fechaHora ? new Date(t.fechaHora) : null;
        
        // Actualiza el contador global si es necesario
        if (t.id > listadoApuntes.contadorListas) {
          listadoApuntes.contadorListas = t.id;
        }
        
        return tarea;
      });
    }
  } catch (error) {
    console.error('Error al cargar desde localStorage:', error);
  }
}

// Inicializa la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarApp);

