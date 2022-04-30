"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simbolo_1 = __importDefault(require("./simbolo"));
const tipo_1 = __importStar(require("./tipo"));
class Entorno {
    constructor(anterior) {
        this.anterior = anterior;
        this.tabla = new Map();
    }
    set(simbolo, valor, tipo, DIMENSION = -1, CANTIDAD = -1) {
        if (!this.tabla.has(simbolo)) {
            this.tabla.set(simbolo, new simbolo_1.default(tipo, simbolo, valor, DIMENSION, CANTIDAD));
        }
        else {
            //Error
            console.log("error");
        }
    }
    update(simbolo, valor, POSICION = -1) {
        for (var temp = this; temp != null; temp = temp.anterior) {
            if (temp.tabla.has(simbolo)) {
                var anterior = temp.tabla.get(simbolo);
                if (anterior) {
                    if (anterior.DIMENSION == -1 && anterior.CANTIDAD == -1) {
                        anterior.valor = valor;
                        temp.tabla.set(simbolo, anterior);
                        return true;
                    }
                    else if (POSICION != -1) {
                        anterior.valor[POSICION] = valor;
                    }
                    else {
                        //ERROR
                        return false;
                    }
                }
            }
        }
        //Error
        return false;
    }
    get(variable) {
        for (var temp = this; temp != null; temp = temp.anterior) {
            if (temp.tabla.has(variable)) {
                var result = temp.tabla.get(variable);
                if (result) {
                    return result;
                }
            }
        }
        //Error
        return new simbolo_1.default(new tipo_1.default(tipo_1.tipos.ERROR), 'ERROR', undefined);
    }
}
exports.default = Entorno;
//# sourceMappingURL=Entorno.js.map