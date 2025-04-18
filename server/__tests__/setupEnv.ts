import path from 'path'

import dotenv from 'dotenv';


const envPath = path.resolve(__dirname, '../.env.test');
dotenv.config({ path: envPath });
