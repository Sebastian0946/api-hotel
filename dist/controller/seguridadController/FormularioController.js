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
exports.deleteFormulario = exports.updateFormulario = exports.getFormularioId = exports.getFormulario = exports.createFormulario = void 0;
const Formularios_1 = require("../../entities/seguridad/Formularios");
const createFormulario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formularioData = Object.assign({}, req.body);
        const result = yield Formularios_1.Formularios.create(formularioData);
        yield result.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createFormulario = createFormulario;
const getFormulario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Formularios_1.Formularios.find();
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getFormulario = getFormulario;
const getFormularioId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Formularios_1.Formularios.findOneBy({ id: parseInt(id) });
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
exports.getFormularioId = getFormularioId;
const updateFormulario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Formularios_1.Formularios.findOneBy({ id: parseInt(id) });
        if (!result)
            return res.status(404).json({ message: "Modulo not found" });
        yield Formularios_1.Formularios.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateFormulario = updateFormulario;
const deleteFormulario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Formularios_1.Formularios.delete({ id: parseInt(id) });
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
exports.deleteFormulario = deleteFormulario;
