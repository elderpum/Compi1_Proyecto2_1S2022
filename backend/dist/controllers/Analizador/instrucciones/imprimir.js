"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const tipo_1 = require("../tablaSimbolo/tipo");
class Imprimir extends Instruccion_1.Instruccion {
    constructor(linea, columna, exp) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        if (this.exp) {
            var result = this.exp.getValor(arbol, tabla);
            if (result.Tipo.tipos != tipo_1.tipos.ERROR) {
                arbol.consola += "\n" + result.valor;
            }
        }
        //ERROR
    }
}
exports.default = Imprimir;
//# sourceMappingURL=imprimir.js.map