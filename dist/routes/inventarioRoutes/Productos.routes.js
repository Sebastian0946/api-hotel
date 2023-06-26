"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductoController_1 = require("../../controller/invetarioController/ProductoController");
const router = (0, express_1.Router)();
router.post('/inventario/producto', ProductoController_1.createProducto);
router.get('/inventario/producto', ProductoController_1.getProducto);
router.put('/inventario/producto/:id', ProductoController_1.updateProducto);
router.delete('/inventario/producto/:id', ProductoController_1.deleteProducto);
router.get('/inventario/producto/:id', ProductoController_1.getProductoId);
exports.default = router;
