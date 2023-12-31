import { NotFound } from "http-errors";
import dataBase from "../../db";

import { LoginDto } from "../../Dto/seguridadDto/LoginDto";
import { PermissionDto } from "../../Dto/seguridadDto/PermissionDto";

import { UsuarioService, Query, id } from "../../service/seguridadService/UsuarioService";
import { Usuarios } from "../../entities/seguridad/Usuarios";
import { error } from "console";
import { Estado } from "../../entities/ModelEntity";

export class UsuarioRepository implements UsuarioService<Usuarios> {

  private repository = dataBase.getRepository(Usuarios);

  async create(data: Partial<Usuarios>, query?: Query): Promise<Usuarios> {
    try {
      const result = this.repository.create(data);

      await this.repository.save(result);

      return result;

    } catch (error) {
      throw new Error('Failed to create usuario' + error);
    }
  }

  async list(query?: Query): Promise<Usuarios[]> {
    try {
      const queryBuilder = this.repository.createQueryBuilder("Usuarios")
        .leftJoinAndSelect("Usuarios.PersonaId", "persona")
        .orderBy("Usuarios.id", "ASC");

      const result = await queryBuilder.getMany();

      return result;
    } catch (error) {
      throw new Error('No se pudo recuperar la lista de usuarios: ' + error);
    }
  }


  async get(id: id, query?: Query): Promise<Usuarios> {
    try {
      const queryBuilder = this.repository.createQueryBuilder("Usuarios")
        .leftJoinAndSelect("Usuarios.PersonaId", "persona")
        .where("Usuarios.id = :id", { id });

      const result = await queryBuilder.getOne();

      if (!result) {
        throw new NotFound("Usuario not found" + error);
      }

      return result;
    } catch (error) {
      throw new Error('Failed to retrieve usuario' + error);
    }
  }

  async update(id: id, data: Usuarios, query?: Query): Promise<Usuarios> {
    try {
      const queryBuilder = this.repository.createQueryBuilder("Usuarios")
        .where("Usuarios.id = :id", { id });

      if (query && query.someCondition) {
        queryBuilder.andWhere("Usuarios.someColumn = :value", { value: query.someValue });
      }

      const result = await queryBuilder.update().set(data).returning("*").execute();

      if (result.affected === 0) {
        throw new NotFound("Usuario not found" + error);
      }

      return result.raw[0];
    } catch (error) {
      throw new Error('Failed to update usuario' + error);
    }
  }

  async remove(id: id, query?: Query): Promise<Usuarios> {
    try {
      const queryBuilder = this.repository.createQueryBuilder("Usuarios")
        .where("Usuarios.id = :id", { id });

      const result = await queryBuilder.update()
        .set({ Estado: Estado.Desactivado, fecha_eliminacion: new Date() })
        .returning("*")
        .execute();

      if (result.affected === 0) {
        throw new NotFound("Producto no encontrada");
      }

      return result.raw[0];
    } catch (error) {
      throw error;
    }
  }

  async getPermission(usuario: string, contrasena: string): Promise<PermissionDto[]> {
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
      const result = await this.repository.query(query, [usuario, contrasena]);

      const permisos: PermissionDto[] = result.map((row: PermissionDto) => ({
        FormularioRuta: row.FormularioRuta,
        FormularioEtiqueta: row.FormularioEtiqueta,
        FormularioIcono: row.FormularioIcono,
        ModuloRuta: row.ModuloRuta,
        ModuloEtiqueta: row.ModuloEtiqueta,
      }));

      return permisos;

    } catch (error) {
      console.error('Error al obtener los permisos:', error);
      throw new Error('Ocurrió un error al obtener los permisos');
    }
  }

  async getLogin(usuario: string, contrasena: string): Promise<LoginDto> {
    try {
      const queryBuilder = this.repository.createQueryBuilder("u")
        .select("u.estado", "estado")
        .addSelect("u.usuario", "usuario")
        .where("u.usuario = :usuario", { usuario })
        .andWhere("u.contrasena = :contrasena", { contrasena })
        .andWhere("u.estado = 'Activo'");

      const result = await queryBuilder.getRawOne();

      if (!result) {
        throw new Error('Login details not found');
      }

      const login: LoginDto = {
        estado: result.estado,
        usuario: result.usuario,
      };

      return login;

    } catch (error) {
      throw new Error('Failed to retrieve login details ' + error);
    }
  }
}