/**
 * @fileoverview Frontend Client API for MatchDay Assistant.
 * Securely calls our local Node.js Express backend to prevent exposure of Google Cloud credentials.
 */

/**
 * Sends a contextual prompt to our Express proxy server.
 * @param {string} promptText - The raw user input string.
 * @returns {Promise<string>} The structured response dynamically generated server-side.
 */
export async function fetchGeminiResponse(promptText) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptText })
        });
        
        if (!response.ok) throw new Error("Server Request Failed");
        
        const data = await response.json();
        return data.reply || "Error processing request.";
        
    } catch(err) {
        console.error("Gemini Bridge Integration Failed:", err);
        return "I am currently disconnected from the main server. Please refer to the live map.";
    }
}
