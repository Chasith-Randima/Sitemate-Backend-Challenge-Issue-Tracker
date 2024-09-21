import dotenv from 'dotenv';

export const config = (): void => {
    dotenv.config();
    if (!process.env.MONGO_URI) {
        throw new Error('Missing required environment variables');
    }
};