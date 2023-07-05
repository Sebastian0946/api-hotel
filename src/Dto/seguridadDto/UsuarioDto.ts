import { Estado } from '../../entities/ModelEntity';

export interface UsuarioDto {

    usuario: string;
    contrasena: string;
    estado: Estado;
}