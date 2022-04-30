"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entorno_1 = __importDefault(require("./Entorno"));
class ArbolAST {
    constructor(Instrucciones) {
        this.errores = new Array();
        this.Instrucciones = Instrucciones;
        this.consola = "";
        this.global = new Entorno_1.default();
    }
    updateConsola(update) {
        this.consola = `${this.consola}${update}\n`;
    }
    EjecutarBloque() {
        for (var elemento of this.Instrucciones) {
            elemento.ejecutar(this, this.global);
        }
    }
}
exports.default = ArbolAST;
//# sourceMappingURL=ArbolAST.js.map