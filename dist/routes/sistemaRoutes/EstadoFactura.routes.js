"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EstadoFacturaController_1 = require("../../controller/sistemaController/EstadoFacturaController");
const EstadoFacturaRepository_1 = require("../../repository/sistemaRepository/EstadoFacturaRepository");
const router = (0, express_1.Router)();
const controller = new EstadoFacturaController_1.EstadoFacturaController(new EstadoFacturaRepository_1.EstadoFacturaRepository());
router.post('/sistema/estadoFactura', controller.create.bind(controller));
router.get('/sistema/estadoFactura', controller.list.bind(controller));
router.get('/sistema/estadoFactura/:id', controller.get.bind(controller));
router.put('/sistema/estadoFactura/:id', controller.update.bind(controller));
router.put('/sistema/estadoFactura/eliminar/:id', controller.remove.bind(controller));
exports.default = router;
