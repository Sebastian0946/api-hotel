import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, DeleteDateColumn } from 'typeorm';

export enum Estado {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
  Desactivado = 'Desactivado'
}

export abstract class ModelEntity extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'estado',type: 'enum', enum: Estado, default: Estado.Activo})
  Estado: Estado;
  
  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_modificacion: Date;

  @UpdateDateColumn()
  fecha_eliminacion: Date;
}