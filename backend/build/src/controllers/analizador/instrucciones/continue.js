"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const nodoAST_1 = require("../abstracto/nodoAST");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
class CONTINUE extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(arbol, tabla) {
        if (arbol.pilaCiclo.length == 0) {
            arbol.num_error++;
            arbol.errores.push(new Errores_1.default(arbol.num_error, "SINTACTICO", "No se puede utiilzar continue fuera de un ciclo", this.linea, this.columna));
            return;
        }
        this.ast = true;
        return { nombre: "CONTINUE", retorno: undefined };
        //ERROR
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("CONTINUE");
        nodo.agregarHijo("CONTINUE");
        nodo.agregarHijo(";");
        return nodo;
    }
}
exports.default = CONTINUE;
