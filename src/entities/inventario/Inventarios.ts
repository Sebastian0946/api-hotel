import { Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Productos} from './Productos';

@Entity({schema: 'inventario'})
export class Inventarios extends ModelEntity {

    @Column({name: 'habitacionId', unique: true, nullable: false})
    HabitacionId: String;
    
    @ManyToOne(() => Productos)
    @JoinColumn({name: 'productoId'})
    ProductoId: Productos;
}
