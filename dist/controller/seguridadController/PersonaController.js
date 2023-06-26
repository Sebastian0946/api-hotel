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
exports.deletePersona = exports.updatePersona = exports.getPersonaId = exports.getPersona = exports.createPersona = void 0;
const Personas_1 = require("../../entities/seguridad/Personas");
const createPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personaData = Object.assign({}, req.body);
        const result = yield Personas_1.Personas.create(personaData);
        yield result.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createPersona = createPersona;
const getPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Personas_1.Personas.find();
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getPersona = getPersona;
const getPersonaId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Personas_1.Personas.findOneBy({ id: parseInt(id) });
        if (!result)
            return res.status(404).json({ message: "Persona not found" });
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getPersonaId = getPersonaId;
const updatePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Personas_1.Personas.findOneBy({ id: parseInt(id) });
        if (!result)
            return res.status(404).json({ message: "Persona not found" });
        yield Personas_1.Personas.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updatePersona = updatePersona;
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Personas_1.Personas.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Persona not found' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deletePersona = deletePersona;
