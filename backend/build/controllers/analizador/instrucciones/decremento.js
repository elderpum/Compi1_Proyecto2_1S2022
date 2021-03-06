"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
class DECREMENT extends Instruccion_1.Instruccion {
    constructor(linea, columna, exp) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        if (this.exp) {
            var v = this.exp.getValor(arbol, tabla);
        }
        //ERROR
    }
    getNodo() {
        let nodo = this.exp.getNodo();
        nodo.agregarHijo(";");
        return nodo;
    }
}
exports.default = DECREMENT;
//# sourceMappingURL=decremento.js.map