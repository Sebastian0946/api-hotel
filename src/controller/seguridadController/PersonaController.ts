import { Request, Response } from "express"
import { Personas } from "../../entities/seguridad/Personas";

export const createPersona = async (req: Request, res: Response) => {
    try {
        const personaData = { ...req.body };
  
        const result = await Personas.create(personaData);
        await result.save();
  
        return res.sendStatus(204);
      
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};
  
export const getPersona = async (req: Request, res: Response)  => {
    try {
        const result = await Personas.find()
        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const getPersonaId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await Personas.findOneBy({id: parseInt(id)})
    
        if (!result) return res.status(404).json({ message: "Persona not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updatePersona = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const result = await Personas.findOneBy({ id: parseInt(id) });

        if (!result) return res.status(404).json({ message: "Persona not found" });
           
        await Personas.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deletePersona = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await Personas.delete({id: parseInt(id)})
    
        if (result.affected === 0){
            return res.status(404).json({message: 'Persona not found'})
        }
    
        return res.sendStatus(204)

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};