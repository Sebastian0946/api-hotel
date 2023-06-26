import { Request, Response } from "express"
import { Usuarios } from "../../entities/seguridad/Usuarios";
import { getRepository } from 'typeorm';

export const createUsuario = async (req: Request, res: Response)  => { 

   try {
        const usuarioData = { ...req.body };

        const result = await Usuarios.create(usuarioData);
        await result.save(); 
        
        return res.sendStatus(204);

   } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
   }
};

export const getUsuario = async (req: Request, res: Response)  => {
    try {
        const result = await Usuarios.find({ relations: ['PersonaId'] }); 
        return res.json(result);
    } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
        }
    }      
};

export const getUsuarioId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await Usuarios.find({ relations: ['PersonaId'] });
    
        if (!result) return res.status(404).json({ message: "User not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updateUsuario = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const usuarios = await Usuarios.findOneBy({ id: parseInt(id) });

        if (!usuarios) return res.status(404).json({ message: "Not user found" });
           
        await Usuarios.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deleteUsuario = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await Usuarios.delete({id: parseInt(id)})
    
        if (result.affected === 0){
            return res.status(404).json({message: 'User not found'})
        }
    
        return res.sendStatus(204)

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};