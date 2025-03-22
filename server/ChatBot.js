import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log("OpenAI API Key:", OPENAI_API_KEY);


app.post('/api/chatbot', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Error processing request", details: error.response?.data || error.message});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
