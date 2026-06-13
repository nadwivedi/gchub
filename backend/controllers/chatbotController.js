const SYSTEM_PROMPT = `You are a helpful customer support assistant for Voucher Cash — an online platform where users can buy digital gift cards, game top-ups, and vouchers at discounted prices.

Key information about Voucher Cash:
- We sell digital gift cards for Google Play, Amazon, Flipkart, Steam, Myntra, BigBasket and more
- We sell game top-ups and credits (Garena Free Fire, BGMI, Mobile Legends, PUBG, etc.)
- All products are delivered digitally — no physical shipping required
- Orders are processed quickly and codes are shared via account/email
- We offer discounted prices on all vouchers
- Refunds: We offer refunds only if the voucher code is invalid/not working
- For serious issues, users can email support@vouchercash.in

Your responsibilities:
- Help users with order issues, product inquiries, refund questions, or account problems
- Be friendly, professional, and concise
- Keep responses short and clear — avoid long paragraphs
- Answer in the same language the user writes in (Hindi or English)
- Only help with Voucher Cash related queries`;

const chatWithBot = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, message: 'Messages are required' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: 'AI service not configured' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(({ role, content }) => ({ role, content }))
        ],
        max_tokens: 400,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq API error:', err);
      return res.status(502).json({ success: false, message: 'AI service error. Please try again.' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({ success: false, message: 'Empty response from AI' });
    }

    return res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error('Chatbot error:', error.message);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
};

module.exports = { chatWithBot };
