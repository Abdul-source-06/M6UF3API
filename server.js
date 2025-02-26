const express = require('express');
const mongoose = require('mongoose');
const { getLlibres, saveLlibres, getByDate } = require('./src/api/api');
const app = express();
const port = process.env.PORT || 3030;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect('mongodb+srv://Abdul:abdul1234@cluster1.8tcez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Definir rutas usando las funciones importadas
app.get('/', (req, res) => {
res.send('Hello World!');
}
);

const LlibresSchema = new mongoose.Schema({
  titol: String,
  autor: String,
  anyPublicacio: Number,
  descripcio: String,
  categories: [String]
});


const Llibres = mongoose.model('Llibreszz', LlibresSchema, 'Llibres');

app.post('/add', saveLlibres);
app.get('/list', (req, res) => {
  try {
    console.log('Fetching books');
    const books = Llibres.find();
    console.log(books);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
}
);
app.get('/list/:dataini/:datafi', getByDate);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
