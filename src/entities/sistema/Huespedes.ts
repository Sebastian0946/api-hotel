import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { Personas } from "../seguridad/Personas";
import { ReservaHabitaciones } from "./ReservaHabitaciones";
import { Descuentos } from "./Descuentos";


@Entity({schema: ''})
export class Huespedes extends ModelEntity {

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @OneToOne(() => Personas, (Personas) => Personas.HuespedId)
    @JoinColumn({name: 'persona_id'})
    PersonaId: Personas;

    @ManyToOne(() => Descuentos, (descuento) => descuento.HuespedId)
    @JoinColumn({name: 'descuentosId'})
    DescuentoId: Descuentos

    @OneToMany(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.HabitacionId)
    ReservaHabitacionId: ReservaHabitaciones
}