"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dato = void 0;
class Dato {
    constructor(titulo, descripcion) {
        this._titulo = titulo;
        this._descripcion = descripcion;
    }
    get titulo() {
        return this._titulo;
    }
    set titulo(value) {
        this._titulo = value;
    }
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(value) {
        this._descripcion = value;
    }
    toString() {
        return `Título: ${this._titulo}, Descripción: ${this._descripcion}`;
    }
}
exports.Dato = Dato;
