"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(num, tipo, descripcion, fila, columna) {
        this.numero = num;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    toString() {
        return this.tipo + " - " + this.descripcion + " [" + this.fila + ", " + this.columna + "]";
    }
    imprimir() {
        return this.toString() + "\n";
    }
}
exports.default = Errores;
