"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listadoApuntes = void 0;
const Dato_1 = require("./Dato");
class listadoApuntes extends Dato_1.Dato {
    constructor(titulo, descripcion) {
        super(titulo, descripcion);
        this._id = ++listadoApuntes.contadorListas;
    }
    get id() {
        return this._id;
    }
    toString() {
        return `ID: ${this.id}, ${super.toString()}`;
    }
}
exports.listadoApuntes = listadoApuntes;
listadoApuntes.contadorListas = 0;
