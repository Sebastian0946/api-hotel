import { Request, Response } from "express"
import { FormulariosRoles } from "../../entities/seguridad/FormulariosRoles";

export const createFormularioRol = async (req: Request, res: Response) => {
    try {
        const formularioRolData = { ...req.body };
  
        const result = await FormulariosRoles.create(formularioRolData);
        await result.save();
  
        return res.sendStatus(204);
      
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};
  
export const getFormularioRol = async (req: Request, res: Response)  => {
    try {
        const result = await FormulariosRoles.find()
        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const getFormularioRolId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await FormulariosRoles.findOneBy({id: parseInt(id)})
    
        if (!result) return res.status(404).json({ message: "Modulo not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updateFormularioRol = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const result = await FormulariosRoles.findOneBy({ id: parseInt(id) });

        if (!result) return res.status(404).json({ message: "Modulo not found" });
           
        await FormulariosRoles.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deleteFormularioRol = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await FormulariosRoles.delete({id: parseInt(id)})
    
        if (result.affected === 0){
            return res.status(404).json({message: 'Modulo not found'})
        }
    
        return res.sendStatus(204)

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};