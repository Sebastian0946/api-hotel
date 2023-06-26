import { Request, Response } from "express"
import { Formularios } from "../../entities/seguridad/Formularios";

export const createFormulario = async (req: Request, res: Response) => {
    try {
        const formularioData = { ...req.body };
  
        const result = await Formularios.create(formularioData);
        await result.save();
  
        return res.sendStatus(204);
      
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};
  
export const getFormulario = async (req: Request, res: Response)  => {
    try {
        const result = await Formularios.find()
        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const getFormularioId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await Formularios.findOneBy({id: parseInt(id)})
    
        if (!result) return res.status(404).json({ message: "Modulo not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updateFormulario = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const result = await Formularios.findOneBy({ id: parseInt(id) });

        if (!result) return res.status(404).json({ message: "Modulo not found" });
           
        await Formularios.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deleteFormulario = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await Formularios.delete({id: parseInt(id)})
    
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