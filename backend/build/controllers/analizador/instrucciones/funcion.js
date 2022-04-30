"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = require("../Abstract/nodoAST");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const Entorno_1 = __importDefault(require("../tablaSimbolo/Entorno"));
const ListaSimbolos_1 = __importDefault(require("../tablaSimbolo/ListaSimbolos"));
const tipo_1 = require("../tablaSimbolo/tipo");
class FUNCIONF extends instruccion_1.Instruccion {
    constructor(linea, columna, tipo, nombre, INS, Parametro, vector = false) {
        super(linea, columna);
        this.registrada = false;
        this.reg = false;
        this.tipo = tipo;
        this.nombre = nombre;
        this.INSTRUCCION = INS;
        this.PARAMETRO = Parametro;
        this.vector = vector;
    }
    ejecutar(arbol, tabla) {
        let up = this.nombre.toUpperCase();
        if (up === "LENGTH" || up === "TRUNCATE" || up === "ROUND"
            || up === "TYPEOF" || up === "TOSTRING" || up === "TOCHARARRAY") {
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Existe una función nativa con este nombre", this.linea, this.columna));
            return;
        }
        let nuevo_nombre = this.nombre + "#";
        if (this.PARAMETRO) {
            for (let par of this.PARAMETRO) {
                nuevo_nombre += "" + par.tipo.tipos;
            }
        }
        var comprobar = tabla.get(nuevo_nombre);
        if (comprobar.tipo.tipos === tipo_1.tipos.ERROR) {
            if (!this.reg) {
                if (this.vector) {
                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, nuevo_nombre, "METODO", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));
                }
                else {
                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, nuevo_nombre, "FUNCION", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));
                }
                this.reg = true;
            }
            if (!this.registrada) {
                let Nuevo_Entorno = new Entorno_1.default(this.nombre, tabla);
                if (this.PARAMETRO) {
                    for (let sim of this.PARAMETRO) {
                        let valor = sim;
                        if (valor.CANTIDAD !== -1) {
                            arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, valor.ID, "LISTA", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                        }
                        else if (valor.DIMENSION !== -1) {
                            arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, valor.ID, "VECTOR", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                        }
                        else {
                            if (valor.valor instanceof FUNCIONF) {
                                arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, valor.ID, "FUNCION", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                            }
                            arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, valor.ID, "VARIABLE", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                        }
                    }
                }
                if (this.INSTRUCCION) {
                    for (let element of this.INSTRUCCION) {
                        if (typeof (element) !== typeof ("")) {
                            let valor = element;
                            if (valor.ID && !valor.UBICACION && valor.CANTIDAD && valor.DIMENSION) {
                                if (valor.ID === "caracteres") {
                                }
                                if (valor.CANTIDAD !== -1) {
                                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, valor.ID, "LISTA", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                                }
                                else if (valor.DIMENSION !== -1) {
                                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, valor.ID, "VECTOR", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                                }
                                else if (element.ID) {
                                    if (valor.exp instanceof FUNCIONF) {
                                        arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, valor.ID, "FUNCION", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                                    }
                                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, valor.ID, "VARIABLE", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                                }
                            }
                        }
                    }
                }
                this.registrada = true;
            }
            tabla.set(nuevo_nombre, this, this.tipo, -1, -1);
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Ya existe una función con el nombre indicado", this.linea, this.columna));
        return;
        // ERROR
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("FUNCION");
        let nodo2 = new nodoAST_1.nodoAST("PARAMETROS");
        let nodo3 = new nodoAST_1.nodoAST("INSTRUCCIONES");
        if (this.vector) {
            nodo.agregarHijo("VOID");
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("(");
            if (this.PARAMETRO) {
                if (this.PARAMETRO.length > 0) {
                    for (let element of this.PARAMETRO) {
                        nodo2.agregarHijo(undefined, undefined, element.getNodo());
                    }
                    nodo.agregarHijo(undefined, undefined, nodo2);
                }
            }
            nodo.agregarHijo(")");
            nodo.agregarHijo("{");
            for (let element of this.INSTRUCCION) {
                nodo3.agregarHijo(undefined, undefined, element.getNodo());
            }
            nodo.agregarHijo(undefined, undefined, nodo3);
            nodo.agregarHijo("}");
        }
        else {
            nodo.agregarHijo(undefined, undefined, this.tipo.getNodo());
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("(");
            if (this.PARAMETRO.length > 0) {
                for (let element of this.PARAMETRO) {
                    nodo2.agregarHijo(undefined, undefined, element.getNodo());
                }
                nodo.agregarHijo(undefined, undefined, nodo2);
            }
            nodo.agregarHijo(")");
            nodo.agregarHijo("{");
            for (let element of this.INSTRUCCION) {
                nodo3.agregarHijo(undefined, undefined, element.getNodo());
            }
            nodo.agregarHijo(undefined, undefined, nodo3);
            nodo.agregarHijo("}");
        }
        return nodo;
    }
}
exports.default = FUNCIONF;
//# sourceMappingURL=funcion.js.map