import mariadb from 'mariadb'
import 'dotenv/config'
import { items } from '../model/createTable';



const pool = mariadb.createPool({
    host: process.env.DB_HOST, 
    user:process.env.DB_USER, 
    database:process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3307,
});

export const dbInit = async ()=>{
    try {
        const myData= await pool.getConnection();
        const rows = await myData.query("SELECT NOW ()");
        console.log(rows[0])
        await items();
        // await cart ();
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export const query = async (text: string, params?: any[]) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.affectedRows })
    return res
  }