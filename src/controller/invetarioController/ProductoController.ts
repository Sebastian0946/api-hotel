import { Request, Response } from "express"
import { Productos } from "../../entities/inventario/Productos";

export const createProducto = async (req: Request, res: Response) => {
    try {
        const productoData = { ...req.body };
  
        const result = await Productos.create(productoData);
        await result.save();
  
        return res.sendStatus(204);
      
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};
  
export const getProducto = async (req: Request, res: Response)  => {
    try {
        const result = await Productos.find()
        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const getProductoId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await Productos.findOneBy({id: parseInt(id)})
    
        if (!result) return res.status(404).json({ message: "Modulo not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updateProducto = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const result = await Productos.findOneBy({ id: parseInt(id) });

        if (!result) return res.status(404).json({ message: "Modulo not found" });
           
        await Productos.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deleteProducto = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await Productos.delete({id: parseInt(id)})
    
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