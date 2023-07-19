import { config } from "dotenv";

export const PORT = process.env.PORT || 3000;

export const DB_USER = process.env.DB_USER || 'sebas';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'mVOlCVAmgHWPakQF8fjXMYBY1ZMFUCx4';
export const DB_HOST = process.env.DB_HOST || 'dpg-cis119p8g3n42okpck20-a';
export const DB_DATABASE = process.env.DB_DATABASE || 'hotel_tk7b';
export const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);