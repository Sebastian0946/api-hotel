import { Column, Entity, OneToMany } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { ReservaHabitaciones } from "./ReservaHabitaciones";
import { ConsumoHabitaciones } from "./ConsumoHabitaciones";
import { Huespedes } from "./Huespedes";

@Entity({schema: 'public'})
export class Descuentos extends ModelEntity{

    @Column({name: 'valorNeto', type: 'double precision', nullable: false})
    ValorNeto: number;

    @Column({name: 'porcentajeDescuento', type: 'double precision', nullable: false})
    PorcentajeDescuento: number;

    // Relacion con Reserva Habitacion
    @OneToMany(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.DescuentoId)
    ReservaHabitacionId: ReservaHabitaciones

    // Relacion con Consumo Habitaciones
    @OneToMany(() => ConsumoHabitaciones, (consumoHabitacion) => consumoHabitacion.DescuentoId)
    ConsumoHabitacionesId: ConsumoHabitaciones;

    // Relacion con Huesped
    @OneToMany(() => Huespedes, (huesped) => huesped.DescuentoId)
    HuespedId: Huespedes;
}
