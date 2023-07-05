"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_errors_1 = require("http-errors");
function errorHandler(err, req, res, next) {
    console.error(err); // Imprime el error en la consola para propósitos de depuración
    // Comprueba si el error es una instancia de tu clase NotFound personalizada
    if (err instanceof http_errors_1.NotFound) {
        return res.status(404).json({ error: err.message });
    }
    // Si el error no es reconocido, devuelve un error de servidor interno
    return res.status(500).json({ error: 'Internal Server Error' });
}
exports.errorHandler = errorHandler;
