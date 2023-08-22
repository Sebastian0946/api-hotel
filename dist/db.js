"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entities_1 = __importDefault(require("./entities"));
const config_1 = require("./config");

// exports.default = new typeorm_1.DataSource({
//     type: 'postgres',
//     host: process.env.DB_HOST || config_1.DB_HOST,
//     username: process.env.DB_USER || config_1.DB_USER,
//     password: process.env.DB_PASSWORD || config_1.DB_PASSWORD,
//     port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : config_1.DB_PORT,
//     database: process.env.DB_DATABASE || config_1.DB_DATABASE,
//     entities: entities_1.default,
//     synchronize: true,
// });

export default new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  entities: Entities,
  synchronize: true,
  ssl: true
});
