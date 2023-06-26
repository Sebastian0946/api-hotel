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
exports.deleteFormularioRol = exports.updateFormularioRol = exports.getFormularioRolId = exports.getFormularioRol = exports.createFormularioRol = void 0;
const FormulariosRoles_1 = require("../../entities/seguridad/FormulariosRoles");
const createFormularioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formularioRolData = Object.assign({}, req.body);
        const result = yield FormulariosRoles_1.FormulariosRoles.create(formularioRolData);
        yield result.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createFormularioRol = createFormularioRol;
const getFormularioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield FormulariosRoles_1.FormulariosRoles.find();
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getFormularioRol = getFormularioRol;
const getFormularioRolId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield FormulariosRoles_1.FormulariosRoles.findOneBy({ id: parseInt(id) });
        if (!result)
            return res.status(404).json({ message: "Modulo not found" });
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getFormularioRolId = getFormularioRolId;
const updateFormularioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield FormulariosRoles_1.FormulariosRoles.findOneBy({ id: parseInt(id) });
        if (!result)
            return res.status(404).json({ message: "Modulo not found" });
        yield FormulariosRoles_1.FormulariosRoles.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateFormularioRol = updateFormularioRol;
const deleteFormularioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield FormulariosRoles_1.FormulariosRoles.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Modulo not found' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteFormularioRol = deleteFormularioRol;
