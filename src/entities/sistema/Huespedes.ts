import { JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { Usuarios } from "../seguridad/Usuarios";
import { ReservaHabitaciones } from "./ReservaHabitaciones";
import { Descuentos } from "./Descuentos";


export class Huespedes extends ModelEntity {

    @ManyToOne(() => Usuarios, (usuario) => usuario.HuespedId)
    @JoinColumn({name: 'usuario_id'})
    UsuarioId: Usuarios;

    @ManyToOne(() => Descuentos, (descuento) => descuento.HuespedId)
    @JoinColumn({name: 'descuentos_id'})
    DescuentoId: Descuentos

    // Relacion con Usuario
    @OneToMany(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.HabitacionId)
    ReservaHabitacionId: ReservaHabitaciones
}