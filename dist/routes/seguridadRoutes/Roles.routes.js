"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RolesController_1 = require("../../controller/seguridadController/RolesController");
const RolesRepository_1 = require("../../repository/seguridadRepository/RolesRepository");
const router = (0, express_1.Router)();
const controller = new RolesController_1.RolController(new RolesRepository_1.RolRepository());
router.post('/seguridad/rol', controller.create.bind(controller));
router.get('/seguridad/rol', controller.list.bind(controller));
router.get('/seguridad/rol/:id', controller.get.bind(controller));
router.put('/seguridad/rol/:id', controller.update.bind(controller));
router.put('/seguridad/rol/eliminar/:id', controller.remove.bind(controller));
exports.default = router;
