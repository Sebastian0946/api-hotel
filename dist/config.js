"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.DB_PORT = exports.DB_DATABASE = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.PORT = void 0;
exports.PORT = process.env.PORT || 3000;
exports.DB_USER = process.env.DB_USER || 'postgres';
exports.DB_PASSWORD = process.env.DB_PASSWORD || '0946';
exports.DB_HOST = process.env.DB_HOST || 'localhost';
exports.DB_DATABASE = process.env.DB_DATABASE || 'Hotel';
exports.DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);

exports.DATABASE_URL = 'postgres://sebas:gQzZjtrLyk5h0mPLD5KWUdxtElct2Jah@dpg-cis1d4p8g3n42okr38pg-a.oregon-postgres.render.com/hotel_ode6';