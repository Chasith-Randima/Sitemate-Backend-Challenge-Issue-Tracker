import { config } from './config/dotenv'
import { connectDB } from './config/db';
import app from './app';

config();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});