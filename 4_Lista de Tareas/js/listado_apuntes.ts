import { Dato } from './Dato';

export class listadoApuntes extends Dato {
    static contadorListas = 0;
    private _id: number;
    private _completada: boolean;
    private _categoria: string;
    private _fechaHora: Date | null;

    constructor(titulo: string, descripcion: string) {
        super(titulo, descripcion);
        this._id = ++listadoApuntes.contadorListas;
        this._completada = false;
        this._categoria = '';
        this._fechaHora = null;
    }

    get id(): number {
        return this._id;
    }

    get completada(): boolean {
        return this._completada;
    }

    set completada(value: boolean) {
        this._completada = value;
    }

    get categoria(): string {
        return this._categoria;
    }

    set categoria(value: string) {
        this._categoria = value;
    }

    get fechaHora(): Date | null {
        return this._fechaHora;
    }

    set fechaHora(value: Date | null) {
        this._fechaHora = value;
    }

    toString(): string {
        let estado = this._completada ? 'Completada' : 'Pendiente';
        let fechaStr = this._fechaHora ? this._fechaHora.toLocaleString() : 'Sin fecha';
        return `ID: ${this.id}, ${super.toString()}, Estado: ${estado}, Categoría: ${this._categoria || 'Sin categoría'}, Fecha: ${fechaStr}`;
    }
}






