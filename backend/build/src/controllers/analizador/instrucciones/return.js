"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const nodoAST_1 = require("../abstracto/nodoAST");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
class RETURN extends Instruccion_1.Instruccion {
    constructor(linea, columna, exp) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        if (arbol.pilaFuncion.length == 0) {
            arbol.num_error++;
            arbol.errores.push(new Errores_1.default(arbol.num_error, "SINTACTICO", "No se puede utiilzar return fuera de una funcion", this.linea, this.columna));
            return;
        }
        if (this.exp) {
            let valor = this.exp.getValor(arbol, tabla);
            if (valor) {
                return { nombre: "RETURN", retorno: valor };
            }
        }
        return { nombre: "RETURN", retorno: undefined };
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("RETURN");
        nodo.agregarHijo("RETURN");
        if (this.exp) {
            nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        }
        nodo.agregarHijo(";");
        return nodo;
    }
}
exports.default = RETURN;
