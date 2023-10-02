import { Entity, Column, OneToOne} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { Usuarios } from './Usuarios';

enum TipoDocumento {
    CC = 'CC',
    TI = 'TI'
}

enum Genero {
    M = 'Masculino',
    F = 'Femenino'
}

@Entity({schema: ''})
export class Personas extends ModelEntity {

    @Column({name: 'tipo_documento', type: 'enum', enum: TipoDocumento, nullable: false})
    TipoDocumento: TipoDocumento;

    @Column({name: 'documento',unique: true})
    Documento: number;

    @Column({name: 'nombres',length: 25})
    Nombres: String;

    @Column({name: 'apellidos',length: 25})
    Apellidos: String;

    @Column({name: 'email',unique: true, length: 50})
    Email: String;

    @Column({name: 'direccion',length: 30})
    Direccion: String

    @Column({name: 'telefono',length: 13})
    Telefono: String

    @Column({name: 'edad'})
    Edad: number;

    @Column({name: 'genero',type: 'enum', enum: Genero})
    Genero: Genero;

    @OneToOne(() => Usuarios, (usuario) => usuario.PersonaId)
    UsuarioId!: Usuarios;
}
