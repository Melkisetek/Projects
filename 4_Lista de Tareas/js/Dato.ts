
export class Dato {
    protected _titulo: string;
    protected _descripcion: string;
    

    constructor(titulo: string, descripcion: string) {
        this._titulo = titulo;
        this._descripcion = descripcion;
    }

    get titulo(): string {
        return this._titulo;
    }
    set titulo(value: string) {
        this._titulo = value;
    }

    get descripcion(): string {
        return this._descripcion;
    }
    set descripcion(value: string) {
        this._descripcion = value;
    }

    toString(): string {
        return `Título: ${this._titulo}, Descripción: ${this._descripcion}`;
    }
}

