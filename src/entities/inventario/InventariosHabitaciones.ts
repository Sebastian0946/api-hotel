import { Entity, Column, ManyToOne, JoinColumn, Double} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Inventarios} from './Inventarios';

@Entity({schema: 'inventario'})
export class InventariosHabitaciones extends ModelEntity {
    
    @ManyToOne(() => Inventarios)
    @JoinColumn({name: 'inventarioId'})
    InventarioId: Inventarios;

    @Column({name: 'administracionHabitacionId'})
    AdministracionHabitacionId: String;

    @Column({name: 'cantidad', nullable: false})
    Cantidad: String;
}
