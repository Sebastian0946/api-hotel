"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(errorHandler_1.errorHandler);
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.use((req, res, next) => {
    res.status(404).json({
        error: {
            code: 'NOT_FOUND',
            message: `Endpoint not found: ${req.method} ${req.url}`,
        },
    });
});
exports.default = app;
