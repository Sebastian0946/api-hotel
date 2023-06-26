import { Request, Response } from "express"
import { Modulos } from "../../entities/seguridad/Modulos";

export const createModulo = async (req: Request, res: Response) => {
    try {
        const moduloData = { ...req.body };
  
        const result = await Modulos.create(moduloData);
        await result.save();
  
        return res.sendStatus(204);
      
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};
  
export const getModulo = async (req: Request, res: Response)  => {
    try {
        const result = await Modulos.find()
        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const getModuloId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await Modulos.findOneBy({id: parseInt(id)})
    
        if (!result) return res.status(404).json({ message: "Modulo not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updateModulo = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const result = await Modulos.findOneBy({ id: parseInt(id) });

        if (!result) return res.status(404).json({ message: "Modulo not found" });
           
        await Modulos.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deleteModulo = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await Modulos.delete({id: parseInt(id)})
    
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