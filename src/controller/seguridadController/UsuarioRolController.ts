import { Request, Response } from "express"
import { UsuariosRoles } from "../../entities/seguridad/UsuariosRoles";

export const createUsuarioRol = async (req: Request, res: Response)  => { 

   try {
        const usuarioRolData = { ...req.body };

        const result = await UsuariosRoles.create(usuarioRolData);
        await result.save(); 
        
        return res.sendStatus(204);

   } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
   }
};

export const getUsuarioRol = async (req: Request, res: Response)  => {
    try {
        const result = await UsuariosRoles.find()
        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const getUsuarioRolId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await UsuariosRoles.findOneBy({id: parseInt(id)})
    
        if (!result) return res.status(404).json({ message: "User not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updateUsuarioRol = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const result = await UsuariosRoles.findOneBy({ id: parseInt(id) });

        if (!result) return res.status(404).json({ message: "Not user found" });
           
        await UsuariosRoles.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deleteUsuarioRol = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await UsuariosRoles.delete({id: parseInt(id)})
    
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

