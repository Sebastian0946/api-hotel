"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entities_1 = __importDefault(require("./entities"));
const config_1 = require("./config");
// export default new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST || DB_HOST,
//   username: process.env.DB_USER || DB_USER,
//   password: process.env.DB_PASSWORD || DB_PASSWORD,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : DB_PORT,
//   database: process.env.DB_DATABASE || DB_DATABASE,
//   entities: Entities,
//   synchronize: true,
//   ssl: true
// });
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    url: config_1.DATABASE_URL,
    entities: entities_1.default,
    synchronize: true,
    ssl: true
});
