import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { Usuarios } from "../seguridad/Usuarios";

@Entity({schema: ''})
export class ConfiguracionSistema extends ModelEntity {

    @ManyToOne(() => Usuarios, (usuario) => usuario.ConfiguracionSistemaId)
    @JoinColumn({name: 'usuario_id'})
    UsuarioId: Usuarios;

    @Column({name: 'codigo'})
    Codigo: String

    @Column({name: 'nombre'})
    Nombre: String

    @Column({name: 'descripcion'})
    Descripcion: String
}