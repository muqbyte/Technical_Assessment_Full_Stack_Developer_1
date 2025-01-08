import { query } from "../database/connection"


export const items = async ()=>{
    try {
        await query (`CREATE TABLE IF NOT EXISTS items (  id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, description VARCHAR(500), price DECIMAL(10, 2) NOT NULL CHECK (price > 0), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`)
        console.log('Items table created')
        
    } catch (error) {
        console.log('failed created the Items table')
    }
}