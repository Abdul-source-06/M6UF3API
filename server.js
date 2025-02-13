
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3030;
// Middleware per parsejar el cos de les sol·licituds a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connecta't a MongoDB (modifica l'URI amb la teva pròpia cadena de connexió)
mongoose.connect('mongodb+srv://Abdul:abdul1234@cluster1.8tcez.mongodb.net/LlibCat?retryWrites=true&w=majority&appName=Cluster1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));


const LlibresSchema = new mongoose.Schema({
  titol: String,
  autor: String,
  anyPublicacio: Number,
  descripcio: String,
  categories: [String]
});

const Llibres = mongoose.model('Llibres', LlibresSchema, 'Llibres');



app.post('/Llibres', async (req, res) => {
  try {
    const { titol, autor, anyPublicacio, descripcio, categories } = req.body;

    if (!titol || !autor || !anyPublicacio || !descripcio || !categories) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const llibre = new Llibres({ titol, autor, anyPublicacio, descripcio, categories });
    await llibre.save();
    
    res.status(201).json(llibre);
  } catch (err) {
    res.status(400).json({ message: 'Error creating book', error: err.message });
  }
});


// Ruta per obtenir tots els usuaris
app.get('/', async (req, res) => {
  try {
    const books = await Llibres.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
});

// Ruta per obtenir un usuari per ID
app.get('/Llibres/:id', async (req, res) => {
  try {
    const llibre = await Llibres.findById(req.params.id);
    if (!llibre) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(llibre);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book', error: err.message });
  }
});

// Ruta per actualitzar un llibre per ID
app.put('/Llibres/:id', async (req, res) => {
  try {
    const { titol, autor, anyPublicacio, descripcio, categories } = req.body;
    
    const llibre = await Llibres.findByIdAndUpdate(req.params.id, 
      { titol, autor, anyPublicacio, descripcio, categories }, 
      { new: true }
    );

    if (!llibre) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(llibre);
  } catch (err) {
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
});

// Ruta per eliminar un usuari per ID
app.delete('/Llibres/:id', async (req, res) => {
  try {
    const llibre = await Llibres.findByIdAndDelete(req.params.id);
    if (!llibre) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
});

// Inicia el servidorxºxºz  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
