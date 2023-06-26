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
exports.deleteInventario = exports.updateInventario = exports.getInventarioId = exports.getInventario = exports.createInventario = void 0;
const Inventarios_1 = require("../../entities/inventario/Inventarios");
const createInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventarioData = Object.assign({}, req.body);
        const result = yield Inventarios_1.Inventarios.create(inventarioData);
        yield result.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createInventario = createInventario;
const getInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Inventarios_1.Inventarios.find();
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getInventario = getInventario;
const getInventarioId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Inventarios_1.Inventarios.findOneBy({ id: parseInt(id) });
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
exports.getInventarioId = getInventarioId;
const updateInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Inventarios_1.Inventarios.findOneBy({ id: parseInt(id) });
        if (!result)
            return res.status(404).json({ message: "Modulo not found" });
        yield Inventarios_1.Inventarios.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateInventario = updateInventario;
const deleteInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Inventarios_1.Inventarios.delete({ id: parseInt(id) });
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
exports.deleteInventario = deleteInventario;
