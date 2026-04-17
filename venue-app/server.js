import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Secure Backend Route for Artificial Intelligence Processing
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    
    // Server-side fallback logic protects against exposing keys to clients
    if (!process.env.VITE_GEMINI_API_KEY) {
        console.warn("⚠️  Operating Gemini backend in local offline simulation mode.");
        return res.json({ reply: await getSimulatedFallback(prompt.toLowerCase()) });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const contextString = "Context: You are the MatchDay Pro Assistant. You help fans navigate huge sporting stadiums, find express food queues, and avoid congested gates. Keep answers very concise, max 2 sentences.";
        const result = await model.generateContent(`${contextString}\n\nUser Question: ${prompt}`);
        
        res.json({ reply: result.response.text() });
    } catch(err) {
        console.error("Gemini Server Integration Failed:", err);
        res.status(500).json({ reply: "I'm having trouble connecting to my central network. Please check the live app maps!" });
    }
});

// Advanced logic proxy isolated from client
function getSimulatedFallback(val) {
    return new Promise(resolve => {
        setTimeout(() => {
            let response = "-gemini- I'm not entirely sure, but I can direct you to guest services for more help!";
            
            if(val.includes('restroom') || val.includes('bathroom') || val.includes('toilet')) {
                response = "-gemini- The closest restroom is at Section 118, however, my map shows high traffic. I suggest routing to Section 110 where the wait is 0 mins.";
            } else if (val.includes('food') || val.includes('hungry') || val.includes('burger')) {
                response = "-gemini- Burger Stadium Grill has a massive line right now! Would you like me to place an express order to your seat instead?";
            } else if (val.includes('exit') || val.includes('leave') || val.includes('parking')) {
                response = "-gemini- Traffic at the East Gate is heavily congested. I recommend an exit route via the North Gate, taking you directly to Parking Level B.";
            } else if (val.includes('hello') || val.includes('hi')) {
                response = "-gemini- Hello Jordan! I'm ready to navigate you through the stadium. What do you need?";
            }
            resolve(response);
        }, 600);
    });
}

// Serve Vite Static Production Bundle securely
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`MatchDay Secure Server active on port ${PORT}`);
});
