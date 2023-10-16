import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { Personas } from "../seguridad/Personas";
import { ReservaHabitaciones } from "./ReservaHabitaciones";
import { Descuentos } from "./Descuentos";
import { Habitaciones } from "./Habitaciones";


@Entity({schema: ''})
export class Huespedes extends ModelEntity {

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @OneToOne(() => Personas, (Personas) => Personas.HuespedId)
    @JoinColumn({name: 'persona_id'})
    PersonaId: Personas;

    @OneToMany(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.HabitacionId)
    ReservaHabitacionId: ReservaHabitaciones

    @OneToMany(() => Habitaciones, (habitaciones) => habitaciones.HuespedId)
    HabitacionesId!: Habitaciones;
}