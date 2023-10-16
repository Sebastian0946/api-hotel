import { Column, Entity, OneToMany } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { ReservaHabitaciones } from "./ReservaHabitaciones";

@Entity({schema: ''})
export class Descuentos extends ModelEntity{

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'porcentajeDescuento', type: 'double precision', nullable: false})
    PorcentajeDescuento: number;

    // Relacion con Reserva Habitacion
    @OneToMany(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.DescuentoId)
    ReservaHabitacionId: ReservaHabitaciones
}