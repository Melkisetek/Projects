"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abrirPopup = abrirPopup;
exports.cerrarPopup = cerrarPopup;
/**
 * Abre el popup para agregar o editar una tarea
 */
function abrirPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    if (popup && overlay) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }
}
/**
 * Cierra el popup
 */
function cerrarPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    if (popup && overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        // Limpia los campos del formulario
        const inputTitulo = document.getElementById('titulo2');
        const inputDescripcion = document.getElementById('texto');
        if (inputTitulo && inputDescripcion) {
            inputTitulo.value = '';
            inputDescripcion.value = '';
        }
        // Restaura el formulario a su estado original si estaba en modo edición
        const form = document.getElementById('formulario');
        if (form && form.dataset.editIndex) {
            form.onsubmit = null; // Elimina el handler personalizado
            delete form.dataset.editIndex;
        }
    }
}
