"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = require("../../controller/seguridadController/UsuarioController");
const UsuarioRepository_1 = require("../../repository/seguridadRepository/UsuarioRepository");
const router = (0, express_1.Router)();
const controller = new UsuarioController_1.UsuarioController(new UsuarioRepository_1.UsuarioRepository());
router.post('/seguridad/usuario', controller.create.bind(controller));
router.get('/seguridad/usuario', controller.list.bind(controller));
router.get('/seguridad/usuario/:id', controller.get.bind(controller));
router.get('/seguridad/usuario/permisos/:usuario/:contrasena', controller.getPermission.bind(controller));
router.get('/seguridad/usuario/login/:usuario/:contrasena', controller.getLogin.bind(controller));
router.put('/seguridad/usuario/:id', controller.update.bind(controller));
router.delete('/seguridad/usuario/:id', controller.remove.bind(controller));
exports.default = router;