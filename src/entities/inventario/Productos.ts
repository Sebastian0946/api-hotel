import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { Categorias } from './Categorias'
import { Inventarios } from './Inventarios';
@Entity({ schema: '' })
export class Productos extends ModelEntity {

    @ManyToOne(() => Categorias, (categoria) => categoria.ProductosId)
    @JoinColumn({ name: 'categoria_id' })
    CategoriaId: Categorias;

    @Column({ name: 'codigo', length: 45 })
    Codigo: string;

    @Column({ name: 'nombre', length: 45 })
    Nombre: string;

    @Column({ name: 'imagen', nullable: true })
    Imagen: string;

    // Relacion con Inventario
    @OneToMany(() => Inventarios, (inventario) => inventario.ProductoId)
    InventarioId: Inventarios

}