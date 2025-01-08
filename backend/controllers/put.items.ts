import { Request, Response } from 'express';
import { query } from '../database/connection';


export const putItemById = async (req:Request, res:Response)=>{
    const { id } = req.params; // Extracting the id from the URL
    const { name, description, price } = req.body; // Extracting values from the request body

    // Make sure the id is a valid number (or any other type validation if needed)
    const checkId=await query('SELECT * FROM items WHERE id = ?', [id])
    console.log("getDb",checkId)
    if(checkId.length == 0 ){
        res.status(404).json({ message: "NO ITEM"});
      }

    try {
        // SQL query to update the item by id
        const result = await query(
            `UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?`,
            [name, description, price, id] // Params to be updated
        );

        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};