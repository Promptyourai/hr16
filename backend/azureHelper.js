async function getAzureReply({ message, history = [], endpoint, apiKey, deployment }) {
  try {
    const system = {
      role: 'system',
      content:
        "You are an HR assistant. Answer only about leave, payroll, benefits, and company policies. If the user asks off-topic questions, politely redirect them to HR or indicate you can't help with that. Be concise and professional."
    };

    const messages = [system];
    if (Array.isArray(history)) history.forEach(h => messages.push(h));
    messages.push({ role: 'user', content: message });

    const url = `${endpoint.replace(/\/+$/,'')}/openai/deployments/${encodeURIComponent(deployment)}/chat/completions?api-version=2023-10-01-preview`;

    // Use global fetch if available (Node 18+). If not, try to require node-fetch.
    let fetchFn = global.fetch;
    if (!fetchFn) {
      try {
        fetchFn = require('node-fetch');
      } catch (e) {
        console.error('Fetch is not available and node-fetch is not installed.');
        return "I'm here to help with HR questions about leave, payroll, benefits, and policies.";
      }
    }

    const resp = await fetchFn(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({ messages })
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error('Azure REST error', resp.status, txt);
      return "I'm here to help with HR questions about leave, payroll, benefits, and policies.";
    }

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || "I'm here to help with HR questions.";
    return reply;
  } catch (err) {
    console.error('Azure REST error', err);
    return "I'm here to help with HR questions about leave, payroll, benefits, and policies.";
  }
}

module.exports = { getAzureReply };
