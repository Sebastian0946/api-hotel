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
exports.deleteUsuario = exports.updateUsuario = exports.getUsuarioId = exports.getUsuario = exports.createUsuario = void 0;
const Usuarios_1 = require("../../entities/seguridad/Usuarios");
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioData = Object.assign({}, req.body);
        const result = yield Usuarios_1.Usuarios.create(usuarioData);
        yield result.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createUsuario = createUsuario;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Usuarios_1.Usuarios.find({ relations: ['PersonaId'] }); // Agrega "relations: ['persona']" para incluir la relación
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUsuario = getUsuario;
const getUsuarioId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Usuarios_1.Usuarios.findOneBy({ id: parseInt(id) });
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
exports.getUsuarioId = getUsuarioId;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuarios = yield Usuarios_1.Usuarios.findOneBy({ id: parseInt(id) });
        if (!usuarios)
            return res.status(404).json({ message: "Not user found" });
        yield Usuarios_1.Usuarios.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Usuarios_1.Usuarios.delete({ id: parseInt(id) });
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
exports.deleteUsuario = deleteUsuario;
