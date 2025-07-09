import { Dato } from './Dato';

export class listadoApuntes extends Dato {
    static contadorListas = 0;
    private _id: number;

    constructor(titulo:string, descripcion:string){
        super(titulo, descripcion);
        this._id = ++listadoApuntes.contadorListas;
    }

    get id(): number {
        return this._id;
    }

    toString(): string {
        return `ID: ${this.id}, ${super.toString()}`;
    }
}






