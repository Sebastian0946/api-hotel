import { config } from "dotenv";

export const PORT = process.env.PORT || 3000;

export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || '0946';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_DATABASE = process.env.DB_DATABASE || 'Hotel';
export const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);

export const DATABASE_URL = 'postgres://hotel_u4pb_user:FIljXlg9WAgdRam1cB4FR2SCIfVDtuwl@dpg-clik7b4m411s73drmjp0-a.oregon-postgres.render.com/hotel_u4pb'