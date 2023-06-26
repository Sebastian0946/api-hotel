"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriaController_1 = require("../../controller/invetarioController/CategoriaController");
const router = (0, express_1.Router)();
router.post('/inventario/categoria', CategoriaController_1.createCategoria);
router.get('/inventario/categoria', CategoriaController_1.getCategoria);
router.put('/inventario/categoria/:id', CategoriaController_1.updateCategoria);
router.delete('/inventario/categoria/:id', CategoriaController_1.deleteCategoria);
router.get('/inventario/categoria/:id', CategoriaController_1.getCategoriaId);
exports.default = router;
