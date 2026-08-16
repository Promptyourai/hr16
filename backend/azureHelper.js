async function getAzureReply({ message, history = [], endpoint, apiKey, deployment }) {
  try {
    const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

    const system = {
      role: 'system',
      content:
        "You are an HR assistant. Answer only about leave, payroll, benefits, and company policies. If the user asks off-topic questions, politely redirect them to HR or indicate you can't help with that. Be concise and professional."
    };

    const messages = [system];
    if (Array.isArray(history)) {
      history.forEach(h => messages.push(h));
    }
    messages.push({ role: 'user', content: message });

    const response = await client.getChatCompletions(deployment, { messages });
    // SDK response path may vary; attempt to read the common shape
    const choice = response?.choices?.[0];
    const reply = choice?.message?.content || choice?.delta?.content || (response?.choices?.[0]?.text);
    return reply || "I'm here to help with HR questions about leave, payroll, benefits, and policies.";
  } catch (err) {
    console.error('Azure OpenAI SDK error', err);
    return "I'm here to help with HR questions about leave, payroll, benefits, and policies.";
  }
}

module.exports = { getAzureReply };
