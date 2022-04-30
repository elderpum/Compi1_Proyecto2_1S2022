"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = require("../controllers/indexControllers");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexControllers_1.IndexController.index);
        this.router.post('/interpretar', indexControllers_1.IndexController.interpretar);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
