import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { ConsumoHabitaciones } from "./ConsumoHabitaciones";

@Entity({schema: ''})
export class EstadoFacturas extends ModelEntity{

    @OneToOne(() => ConsumoHabitaciones, (consumoHabitaciones) => consumoHabitaciones.EstadoFacturaId)
    @JoinColumn({name: 'consumoHabitacion_id'})
    ConsumoHabitacionesId: ConsumoHabitaciones;

    @Column({name: 'codigo', unique: true, length: 25})
    Codigo: string

    @Column({name: 'descripcion', unique: true, length: 25})
    Descripcion: string
}