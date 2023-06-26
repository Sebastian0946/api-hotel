import { Request, Response } from "express"
import { Roles } from "../../entities/seguridad/Roles";

export const createRoles = async (req: Request, res: Response) => {
    try {
        const rolData = { ...req.body };
  
        const result = await Roles.create(rolData);
        await result.save();
  
        return res.sendStatus(204);
      
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};
  
export const getRoles = async (req: Request, res: Response)  => {
    try {
        const result = await Roles.find()
        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const getRolesId = async (req: Request, res: Response)  => {
    try {
        const {id}  = req.params

        const result = await Roles.findOneBy({id: parseInt(id)})
    
        if (!result) return res.status(404).json({ message: "Modulo not found" });

        return res.json(result)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
};

export const updateRoles = async (req: Request, res: Response)  => {
    
    const {id} = req.params;

    try {
        
        const result = await Roles.findOneBy({ id: parseInt(id) });

        if (!result) return res.status(404).json({ message: "Modulo not found" });
           
        await Roles.update({id: parseInt(id)}, req.body)
           
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }

};

export const deleteRoles = async (req: Request, res: Response)  => {
   
    const {id}  = req.params;

    try {

        const result = await Roles.delete({id: parseInt(id)})
    
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