"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servirdor = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const IndexRoutes_1 = __importDefault(require("./routes/IndexRoutes"));
class server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', 5000); //el proceso que toma una variable de entorno o el puerto 3000
        //el set es como si se hubiera declarado el app como una variable
        this.app.use((0, morgan_1.default)('dev')); //dev, es lo que ve la peticion del cliente
        this.app.use((0, cors_1.default)()); //pide datos al server
        this.app.use(express_1.default.json()); //para que se entienda el formato json y lo guarde asi
        this.app.use(express_1.default.urlencoded({ extended: false })); //si se usa formato html
    }
    routes() {
        this.app.use('/', IndexRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en puerto', this.app.get('port'));
        });
    }
}
exports.servirdor = new server();
exports.servirdor.start();
