"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuarioRol = exports.updateUsuarioRol = exports.getUsuarioRolId = exports.getUsuarioRol = exports.createUsuarioRol = void 0;
const UsuariosRoles_1 = require("../../entities/seguridad/UsuariosRoles");
const createUsuarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioRolData = Object.assign({}, req.body);
        const result = yield UsuariosRoles_1.UsuariosRoles.create(usuarioRolData);
        yield result.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createUsuarioRol = createUsuarioRol;
const getUsuarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield UsuariosRoles_1.UsuariosRoles.find();
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUsuarioRol = getUsuarioRol;
const getUsuarioRolId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield UsuariosRoles_1.UsuariosRoles.findOneBy({ id: parseInt(id) });
        if (!result)
            return res.status(404).json({ message: "User not found" });
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUsuarioRolId = getUsuarioRolId;
const updateUsuarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield UsuariosRoles_1.UsuariosRoles.findOneBy({ id: parseInt(id) });
        if (!result)
            return res.status(404).json({ message: "Not user found" });
        yield UsuariosRoles_1.UsuariosRoles.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateUsuarioRol = updateUsuarioRol;
const deleteUsuarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield UsuariosRoles_1.UsuariosRoles.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteUsuarioRol = deleteUsuarioRol;
