"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const nodoAST_1 = require("../abstracto/nodoAST");
class LLAMADA extends Instruccion_1.Instruccion {
    constructor(linea, columna, exp) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        if (this.exp) {
            return this.exp.getValor(arbol, tabla);
        }
        //ERROR
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("");
        console.log(this.exp);
        nodo = this.exp.getNodo();
        nodo.agregarHijo(";");
        return nodo;
    }
}
exports.default = LLAMADA;
