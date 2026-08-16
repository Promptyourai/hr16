exports.handler = async function (event, context) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { message, history } = body;

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!endpoint || !apiKey || !deployment) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: "Hi, I'm your HR assistant. Ask me about leave, payroll, or policies." })
      };
    }

    try {
      const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

      const system = {
        role: 'system',
        content:
          "You are an HR assistant. Answer only about leave, payroll, benefits, and company policies. If the user asks off-topic questions, politely redirect them to HR or indicate you can't help with that. Be concise and professional."
      };

      const messages = [system];
      if (Array.isArray(history)) history.forEach(h => messages.push(h));
      messages.push({ role: 'user', content: message });

      const response = await client.getChatCompletions(deployment, { messages });
      const choice = response?.choices?.[0];
      const reply = choice?.message?.content || choice?.delta?.content || response?.choices?.[0]?.text || "I'm here to help with HR questions.";

      return { statusCode: 200, body: JSON.stringify({ reply }) };
    } catch (err) {
      console.error('Azure SDK error', err);
      return { statusCode: 200, body: JSON.stringify({ reply: "I'm here to help with HR questions about leave, payroll, benefits, and policies." }) };
    }
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ reply: 'Server error' }) };
  }
};
