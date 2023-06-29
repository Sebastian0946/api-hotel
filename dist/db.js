"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entities_1 = __importDefault(require("./entities"));
const config_1 = require("./config");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: config_1.DB_HOST,
    username: config_1.DB_USER,
    password: config_1.DB_PASSWORD,
    port: config_1.DB_PORT,
    database: config_1.DB_DATABASE,
    entities: entities_1.default,
    synchronize: true,
});
