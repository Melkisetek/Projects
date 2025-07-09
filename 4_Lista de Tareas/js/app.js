"use strict";
//import { listadoApuntes } from './listado_apuntes';
Object.defineProperty(exports, "__esModule", { value: true });
const listado_apuntes_1 = require("./listado_apuntes");
const form = document.getElementById('formulario');
const inputTitulo = document.getElementById('titulo2');
const inputDescripcion = document.getElementById('texto');
const tareasContainer = document.getElementById('lista-tareas');
// let guardarBtn = document.getElementById('guardar_btn');
let lista = new listado_apuntes_1.listadoApuntes('Compra de la semana', 'Recoger la compra del supermercado');
function nuevaTarea() {
    //Evento para manejar el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        //Obtiene los valores de los campos del formulario
        const titulo = inputTitulo.value.trim();
        const descripcion = inputDescripcion.value.trim();
        // Verifica que ambos campos tengan contenido
        if (titulo && descripcion) {
            // Crea un nuevo div para la tarea
            const nuevaTarea = document.createElement('div');
            nuevaTarea.classList.add('tarea'); // Puedes usar esta clase para estilos
            // Agrega el contenido de la tarea (puedes personalizar el HTML)
            nuevaTarea.innerHTML = `
        <div class="linea"></div>
        <button class="elemento_eliminar--btn">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <input rel="nofollow" type="text" name="titulo" value="${titulo}" readonly/>
        <input rel="nofollow" type="text" name="descripcion" value="${descripcion}" readonly/>
        <input type="checkbox" name="check" class="check" title="Marcar Completada" />
        <select class="categorias">
          <option value="" disabled selected>Categoría</option>
          <option value="">Tarea</option>
          <option value="">Cocina</option>
          <option value="">Escuela</option>
        </select>
        <input type="datetime-local" name="fechaHora" />
        <button class="elemento_modificar--btn" title="Modificar">
          <ion-icon name="create-outline"></ion-icon>
        </button>
        <br />
        <div class="linea"></div>

      `;
            // Agrega la nueva tarea al contenedor
            tareasContainer.appendChild(nuevaTarea);
            // Limpia los campos del formulario
            inputTitulo.value = '';
            inputDescripcion.value = '';
        }
    });
}
nuevaTarea();
// let tarea = new listadoApuntes('Compra de la semana', 'Recoger la compra del supermercado');
// console.log(tarea.toString());
