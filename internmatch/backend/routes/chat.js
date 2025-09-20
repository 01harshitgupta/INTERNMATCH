const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace with your Perplexity API key
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

const SYSTEM_PROMPT = `You are the official AI assistant for the InternMatch website. Only answer questions about how to use the InternMatch website and its features (such as selecting skills, applying for internships, or using the profile form). Never give general advice about internships, careers, or other websites. If a question is not about InternMatch, reply: 'Sorry, I can only help with the InternMatch website.' Always keep your answers short, direct, and to the point (no more than 2-3 sentences).`;

router.post('/', async (req, res) => {
  const { messages } = req.body; // messages: [{role: 'user'|'assistant'|'system', content: string}]
  if (!PERPLEXITY_API_KEY) {
    return res.status(500).json({ error: 'Perplexity API key not set' });
  }
  try {
    // Perplexity API expects a similar format, but check their docs for latest details
    // Filter out any messages with missing or empty content
    let filteredMessages = Array.isArray(messages)
      ? messages.filter(m => m && typeof m.content === 'string' && m.content.trim() !== '')
      : [];

    // Enforce alternation: after system, must be user, then assistant, then user, etc.
    // Remove consecutive user/user or assistant/assistant
    const alternated = [];
    let lastRole = 'system';
    for (const msg of filteredMessages) {
      if ((lastRole === 'user' && msg.role === 'user') || (lastRole === 'assistant' && msg.role === 'assistant')) {
        continue; // skip consecutive same role
      }
      alternated.push(msg);
      lastRole = msg.role;
    }
    // If first message is not user, remove until user
    while (alternated.length && alternated[0].role !== 'user') alternated.shift();

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...alternated,
        ],
        max_tokens: 500,
        temperature: 0.8,
      },
      {
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // Perplexity's response format is similar to OpenAI's
    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Perplexity API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from Perplexity' });
  }
});

module.exports = router;
