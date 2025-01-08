import { query } from "../database/connection";
import { Request, Response } from 'express';
import { itemsSchema } from "../validators/validator.items";

export const newItem=async (req: Request,res: Response)=>{
    try{
        const { error, value } = itemsSchema.validate(req.body, { abortEarly: false });

         if (error) {
        res.status(400).json({message: 'Validation failed',details: error.details.map((detail) => detail.message),
      });
    }
        const { name, description, price } = value;
            
        const resDb = await query ("INSERT INTO items (name, description, price) VALUES (?,?,?)",[name, description,price])
            res.status(200).json({message:"NEW USER CREATED", data:{name, description, price}})
    }
   
    catch(error){
       console.log(error);
       res.status(500).json({message:"Internal server error"})
    }
   }