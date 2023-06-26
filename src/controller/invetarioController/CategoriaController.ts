import { Request, Response } from "express"
import { Categorias } from "../../entities/inventario/Categorias";

export const createCategoria = async (req: Request, res: Response) => {
    try {
        const categoriaData = { ...req.body };
  
        const result = await Categorias.create(categoriaData);
        await result.save();
  
        return res.sendStatus(204);
      
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};
  
export const getCategoria = async (req: Request, res: Response)  => {
    try {
        const result = await Categorias.find()
        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const getCategoriaId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await Categorias.findOneBy({id: parseInt(id)})
    
        if (!result) return res.status(404).json({ message: "Modulo not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updateCategoria = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const result = await Categorias.findOneBy({ id: parseInt(id) });

        if (!result) return res.status(404).json({ message: "Modulo not found" });
           
        await Categorias.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deleteCategoria = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await Categorias.delete({id: parseInt(id)})
    
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