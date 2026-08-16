const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAzureReply } = require('./azureHelper');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body || {};
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

  // Demo fallback: if env missing, return canned reply but still usable
  if (!endpoint || !apiKey || !deployment) {
    return res.json({ reply: "Hi, I'm your HR assistant. Ask me about leave, payroll, or policies." });
  }

  try {
    const reply = await getAzureReply({ message, history, endpoint, apiKey, deployment });
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, an error occurred while contacting the HR assistant." });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
