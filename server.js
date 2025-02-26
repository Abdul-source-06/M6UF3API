const express = require('express');
const mongoose = require('mongoose');
const { getLlibres, saveLlibres, getByDate } = require('./src/api/api');
const app = express();
const port = process.env.PORT || 3030;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect('mongodb+srv://Abdul:abdul1234@cluster1.8tcez.mongodb.net/LlibCat?retryWrites=true&w=majority&appName=Cluster1', {
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

app.post('/add', saveLlibres);
app.get('/list', (req, res) => {
  res.send('Test list!')});
app.get('/list/:dataini/:datafi', getByDate);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
