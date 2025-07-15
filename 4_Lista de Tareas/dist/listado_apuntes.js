"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listadoApuntes = void 0;
const Dato_1 = require("./Dato");
class listadoApuntes extends Dato_1.Dato {
    constructor(titulo, descripcion) {
        super(titulo, descripcion);
        this._id = ++listadoApuntes.contadorListas;
        this._completada = false;
        this._categoria = '';
        this._fechaHora = null;
    }
    get id() {
        return this._id;
    }
    get completada() {
        return this._completada;
    }
    set completada(value) {
        this._completada = value;
    }
    get categoria() {
        return this._categoria;
    }
    set categoria(value) {
        this._categoria = value;
    }
    get fechaHora() {
        return this._fechaHora;
    }
    set fechaHora(value) {
        this._fechaHora = value;
    }
    toString() {
        let estado = this._completada ? 'Completada' : 'Pendiente';
        let fechaStr = this._fechaHora ? this._fechaHora.toLocaleString() : 'Sin fecha';
        return `ID: ${this.id}, ${super.toString()}, Estado: ${estado}, Categoría: ${this._categoria || 'Sin categoría'}, Fecha: ${fechaStr}`;
    }
}
exports.listadoApuntes = listadoApuntes;
listadoApuntes.contadorListas = 0;
