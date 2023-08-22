import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { EstadoFacturas } from "./EstadoFacturas";
import { Habitaciones } from "./Habitaciones";
import { Huespedes } from "./Huespedes";
import { Descuentos } from "./Descuentos";
import { ConsumoHabitaciones } from "./ConsumoHabitaciones";

@Entity({ schema: 'public' })
export class ReservaHabitaciones extends ModelEntity {

    @ManyToOne(() => EstadoFacturas, (estadoFactura) => estadoFactura.ReservaHabitacionId)
    @JoinColumn({ name: 'estadoFactura_id' })
    EstadoFacturaId: EstadoFacturas;

    @ManyToOne(() => Habitaciones, (habitacion) => habitacion.ReservaHabitacionId)
    @JoinColumn({ name: 'habitacion_id' })
    HabitacionId: Habitaciones;

    @ManyToOne(() => Huespedes, (huesped) => huesped.ReservaHabitacionId)
    @JoinColumn({ name: 'huesped_id' })
    HuespedId: Huespedes;

    @ManyToOne(() => Descuentos, (descuento) => descuento.ReservaHabitacionId)
    @JoinColumn({ name: 'descuento_id' })
    DescuentoId: Descuentos;

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({ name: 'fechaEntrada', type: 'timestamp' })
    FechaEntrada: Date;

    @Column({ name: 'fechaSalida', type: 'timestamp' })
    FechaSalida: Date;

    // Relacion Consumo Habitaciones
    @OneToMany(() => ConsumoHabitaciones, (consumoHabitacion) => consumoHabitacion.ReservaHabitacionesId)
    ConsumoHabitacionesId: ConsumoHabitaciones;
}