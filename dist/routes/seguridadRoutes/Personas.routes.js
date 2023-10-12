"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PersonaController_1 = require("../../controller/seguridadController/PersonaController");
const PersonaRepository_1 = require("../../repository/seguridadRepository/PersonaRepository");
const router = (0, express_1.Router)();
const controller = new PersonaController_1.PersonaController(new PersonaRepository_1.PersonaRepository());
router.post('/seguridad/persona', controller.create.bind(controller));
router.get('/seguridad/persona', controller.list.bind(controller));
router.get('/seguridad/persona/:id', controller.get.bind(controller));
router.put('/seguridad/persona/:id', controller.update.bind(controller));
router.delete('/seguridad/persona/:id', controller.remove.bind(controller));
router.get('/seguridad/persona/:documento', controller.findDocument.bind(controller));
exports.default = router;
