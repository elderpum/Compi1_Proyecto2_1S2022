import { Instruccion } from "../Abstract/instruccion";
import { nodoAST } from "../Abstract/nodoAST";
import Excepcion from "../exceptions/Excepcion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";

export default class BREAK extends Instruccion {
    constructor(linea:number, columna:number){
        super(linea, columna);
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        if (arbol.pilaCiclo.length==0) {
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede utiilzar break fuera de un ciclo", this.linea, this.columna));
            return;
        }
        this.ast = true;
        return {nombre:"BREAK", retorno:undefined};
        //ERROR
    }

    getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST("BREAK");
        nodo.agregarHijo("BREAK");
        nodo.agregarHijo(";")
        return nodo;
    }
}