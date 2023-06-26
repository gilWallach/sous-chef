const express = require("express")
const cors = require("cors")
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai")

dotenv.config();
// let PORT
// process.env.STATUS === `production`
// ? (PORT = process.env.PROD_PORT)
// : (PORT = process.env.DEV_PORT)
const PORT = 8000;
const API_KEY = process.env.API_KEY;
const app = express("public");

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
  ],
  credentials: true,
};

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors(corsOptions));
app.use(express.json());

app.post(`/api/recipe`, async (req, res) => {
  const options = {
    model: "text-davinci-003",
    prompt: req.body.message,
    temperature: 0.3,
    max_tokens: 1200,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  }
  try {
    const response = await openai.createCompletion(options);
    res.send(response.data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));