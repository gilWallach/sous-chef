const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors")
const path = require('path')
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const port = process.env.PORT || 8000
const API_KEY = process.env.API_KEY;
const app = express();

// app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // Configuring CORS
  const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:8000",
      "http://127.0.0.1:8000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions))
}


const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());

// app.post("/api/recipe", (req, res) => {
//   const options = {
//     model: 'gpt-4',
//     messages: [
//       {
//         role: "user",
//         content: req.body.message
//       }
//     ],
//   }

//   const response = openai.createChatCompletion(options);

//   response
//     .then((result) => {
//       // console.log('result.data.choices[0].message.content:', result.data.choices[0].message.content)
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


app.post(`/api/recipe`, async (req, res) => {
  const options = {
    model: 'gpt-4',
    messages: [
      {
        role: "user",
        content: req.body.message
      }
    ]
  }
  try {
    const response = await openai.createChatCompletion(options);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error fetching recipe")
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));