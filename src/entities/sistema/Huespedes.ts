import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { Usuarios } from "../seguridad/Usuarios";
import { ReservaHabitaciones } from "./ReservaHabitaciones";
import { Descuentos } from "./Descuentos";


@Entity({schema: ''})
export class Huespedes extends ModelEntity {

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @ManyToOne(() => Usuarios, (usuario) => usuario.HuespedId)
    @JoinColumn({name: 'usuario_id'})
    UsuarioId: Usuarios;

    @ManyToOne(() => Descuentos, (descuento) => descuento.HuespedId)
    @JoinColumn({name: 'descuentosId'})
    DescuentoId: Descuentos

    // Relacion con Usuario
    @OneToMany(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.HabitacionId)
    ReservaHabitacionId: ReservaHabitaciones
}