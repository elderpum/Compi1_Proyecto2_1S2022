"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const nodoAST_1 = require("../abstracto/nodoAST");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
class BREAK extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(arbol, tabla) {
        if (arbol.pilaCiclo.length == 0) {
            arbol.num_error++;
            arbol.errores.push(new Errores_1.default(arbol.num_error, "SINTACTICO", "No se puede utiilzar break fuera de un ciclo", this.linea, this.columna));
            return;
        }
        this.ast = true;
        return { nombre: "BREAK", retorno: undefined };
        //ERROR
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("BREAK");
        nodo.agregarHijo("BREAK");
        nodo.agregarHijo(";");
        return nodo;
    }
}
exports.default = BREAK;
