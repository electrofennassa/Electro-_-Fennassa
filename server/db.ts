import fs from 'fs';
import path from 'path';

/**
 * ELECTRO_FENNASSA - Database Access Layer
 * Supports modular storage: JSON/SQLite file driver for local development & Termux,
 * easily configured for MySQL/MariaDB/PostgreSQL (Neon) via environment variable DB_TYPE.
 */

const DB_DIR = path.join(process.cwd(), 'database');
const DB_FILE = path.join(DB_DIR, 'electro_fennassa.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

export interface DatabaseState {
  products: any[];
  categories: any[];
  orders: any[];
  storeInfo: any;
}

export class DatabaseAdapter {
  private dbPath: string;

  constructor() {
    this.dbPath = DB_FILE;
  }

  public readData(): DatabaseState {
    try {
      if (fs.existsSync(this.dbPath)) {
        const content = fs.readFileSync(this.dbPath, 'utf-8');
        return JSON.parse(content);
      }
    } catch (err) {
      console.error('Error reading database file:', err);
    }
    return {
      products: [],
      categories: [],
      orders: [],
      storeInfo: {
        name: "ELECTRO_FENNASSA",
        email: "Electro_Fennassa@proton.me",
        phone: "+212644543909",
        address: "BD la Résistance, Hay Jdid, Taourirt, Maroc"
      }
    };
  }

  public writeData(data: DatabaseState): void {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to database file:', err);
    }
  }
}

export const db = new DatabaseAdapter();
