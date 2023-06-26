import { Request, Response } from "express"
import { Inventarios } from "../../entities/inventario/Inventarios";

export const createInventario = async (req: Request, res: Response) => {
    try {
        const inventarioData = { ...req.body };
  
        const result = await Inventarios.create(inventarioData);
        await result.save();
  
        return res.sendStatus(204);
      
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};
  
export const getInventario = async (req: Request, res: Response)  => {
    try {
        const result = await Inventarios.find()
        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const getInventarioId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await Inventarios.findOneBy({id: parseInt(id)})
    
        if (!result) return res.status(404).json({ message: "Modulo not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updateInventario = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const result = await Inventarios.findOneBy({ id: parseInt(id) });

        if (!result) return res.status(404).json({ message: "Modulo not found" });
           
        await Inventarios.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deleteInventario = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await Inventarios.delete({id: parseInt(id)})
    
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