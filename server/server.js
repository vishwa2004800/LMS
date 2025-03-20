import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

// Load environment variables
dotenv.config();

// Initialize express server
const app = express();

// connect to database
await connectDB()

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON requests

// routes
app.get('/', (req, res) => res.send('API working'));
app.post('/clerk', express.json(), clerkWebhooks)

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
