import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { Usuarios } from "../seguridad/Usuarios";

export class ConfiguracionSistema extends ModelEntity {

    @ManyToOne(() => Usuarios, (usuario) => usuario.ConfiguracionSistemaId)
    @JoinColumn({name: 'usuario_id'})
    UsuarioId: Usuarios;

    @Column({name: 'nombre'})
    Nombre: String

    @Column({name: 'descripcion'})
    Descripcion: String
}