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
exports.deleteRoles = exports.updateRoles = exports.getRolesId = exports.getRoles = exports.createRoles = void 0;
const Roles_1 = require("../../entities/seguridad/Roles");
const createRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rolData = Object.assign({}, req.body);
        const result = yield Roles_1.Roles.create(rolData);
        yield result.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createRoles = createRoles;
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Roles_1.Roles.find();
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getRoles = getRoles;
const getRolesId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Roles_1.Roles.findOneBy({ id: parseInt(id) });
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
exports.getRolesId = getRolesId;
const updateRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Roles_1.Roles.findOneBy({ id: parseInt(id) });
        if (!result)
            return res.status(404).json({ message: "Modulo not found" });
        yield Roles_1.Roles.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateRoles = updateRoles;
const deleteRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Roles_1.Roles.delete({ id: parseInt(id) });
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
exports.deleteRoles = deleteRoles;
