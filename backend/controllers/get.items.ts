import { Request, Response } from 'express';
import { query } from '../database/connection';

export const getItems = async (req: Request,res: Response)=>{
    try {
        const data= await query (`SELECT * FROM items`)
        console.log(data)
        res.status(200).json({message:"TABLE DISPLAY", data:data})
        
    } catch (error) {
        console.log(error)
    }
}


export const getItemsId = async (req: Request, res: Response) =>{
    const {id}=req.params;
    try {
        const data= await query (`SELECT * FROM items where id=?`, [id])
        console.log(data)
        res.status(200).json({message:"TABLE DISPLAY", data:data})
        
    } catch (error) {
        console.log(error)
    }
}

