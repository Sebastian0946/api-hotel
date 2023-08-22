import { Column, Entity, OneToMany } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { ReservaHabitaciones } from "./ReservaHabitaciones";

@Entity({schema: 'public'})
export class EstadoFacturas extends ModelEntity{

    @Column({name: 'codigo', unique: true, length: 25})
    Codigo: string

    @Column({name: 'descripcion', unique: true, length: 25})
    Descripcion: string

    // Relacion con Reserva Habitacion
    @OneToMany(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.EstadoFacturaId)
    ReservaHabitacionId: ReservaHabitaciones
}