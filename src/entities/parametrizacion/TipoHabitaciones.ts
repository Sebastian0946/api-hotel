import { Entity, Column, OneToMany } from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { Habitaciones } from '../sistema/Habitaciones';

@Entity({ schema: '' })
export class TipoHabitaciones extends ModelEntity {

    @Column({ name: 'codigo', unique: true, length: 25, nullable: false })
    Codigo: string;

    @Column({ name: 'titulo', length: 25, nullable: false, unique: true })
    Titulo: string;

    @Column({ name: 'descripcion', length: 100, nullable: false })
    Descripcion: string;

    @Column({ name: 'cantidad', length: 25, nullable: false })
    Cantidad: string;

    @Column({ name: 'imagen', nullable: true })
    Imagen: string;

    @OneToMany(() => Habitaciones, (habitaciones) => habitaciones.TipoHabitacionesId)
    HabitacionesId: Habitaciones;
}