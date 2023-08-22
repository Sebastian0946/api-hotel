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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const Usuarios_1 = require("../../entities/seguridad/Usuarios");
const console_1 = require("console");
class UsuarioRepository {
    constructor() {
        this.repository = db_1.default.getRepository(Usuarios_1.Usuarios);
    }
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = this.repository.create(data);
                yield this.repository.save(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to create usuario' + error);
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Usuarios")
                    .leftJoinAndSelect("Usuarios.PersonaId", "persona");
                return queryBuilder.getMany();
            }
            catch (error) {
                throw new Error('Failed to retrieve usuarios' + error);
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Usuarios")
                    .leftJoinAndSelect("Usuarios.PersonaId", "persona")
                    .where("Usuarios.id = :id", { id });
                const result = yield queryBuilder.getOne();
                if (!result) {
                    throw new http_errors_1.NotFound("Usuario not found" + console_1.error);
                }
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve usuario' + error);
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Usuarios")
                    .where("Usuarios.id = :id", { id });
                if (query && query.someCondition) {
                    queryBuilder.andWhere("Usuarios.someColumn = :value", { value: query.someValue });
                }
                const result = yield queryBuilder.update().set(data).returning("*").execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound("Usuario not found" + console_1.error);
                }
                return result.raw[0];
            }
            catch (error) {
                throw new Error('Failed to update usuario' + error);
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.get(id, query);
                yield this.repository.delete(id);
                return result;
            }
            catch (error) {
                throw new Error('Failed to remove usuario' + error);
            }
        });
    }
    getPermission(usuario, contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
                  SELECT
                    f.ruta AS "FormularioRuta",
                    f.etiqueta AS "FormularioEtiqueta",
                    f.icon AS "FormularioIcono",
                    m.ruta AS "ModuloRuta",
                    m.etiqueta AS "ModuloEtiqueta"
                  FROM
                    usuarios AS u
                    INNER JOIN usuarios_roles AS ur ON ur.usuario_id = u.id
                    INNER JOIN roles AS r ON r.id = ur.rol_id
                    INNER JOIN formularios_roles AS fr ON fr.rol_id = r.id
                    INNER JOIN formularios AS f ON f.id = fr.formulario_id
                    INNER JOIN modulos AS m ON m.id = f.modulo_id
                  WHERE
                    u.usuario = $1
                    AND u.contrasena = $2
                    AND u.estado = 'Activo'
                    AND r.estado = 'Activo'
                    AND f.estado = 'Activo'
                    AND m.estado = 'Activo'
                    AND ur.estado = 'Activo'
                    AND fr.estado = 'Activo';
                `;
                const result = yield this.repository.query(query, [usuario, contrasena]);
                const permisos = result.map((row) => ({
                    FormularioRuta: row.FormularioRuta,
                    FormularioEtiqueta: row.FormularioEtiqueta,
                    FormularioIcono: row.FormularioIcono,
                    ModuloRuta: row.ModuloRuta,
                    ModuloEtiqueta: row.ModuloEtiqueta,
                }));
                return permisos;
            }
            catch (error) {
                console.error('Error al obtener los permisos:', error);
                throw new Error('Ocurrió un error al obtener los permisos');
            }
        });
    }
    getLogin(usuario, contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("u")
                    .select("u.estado", "estado")
                    .addSelect("u.usuario", "usuario")
                    .where("u.usuario = :usuario", { usuario })
                    .andWhere("u.contrasena = :contrasena", { contrasena })
                    .andWhere("u.estado = 'Activo'");
                const result = yield queryBuilder.getRawOne();
                if (!result) {
                    throw new Error('Login details not found');
                }
                const login = {
                    estado: result.estado,
                    usuario: result.usuario,
                };
                return login;
            }
            catch (error) {
                throw new Error('Failed to retrieve login details ' + error);
            }
        });
    }
}
exports.UsuarioRepository = UsuarioRepository;
