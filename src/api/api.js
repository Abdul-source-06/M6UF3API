const Llibres = require('../model/llibresModel');

// Obtener todos los libros
async function getLlibres(req, res) {
  try {
    const books = await Llibres.find().lean();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
}

// Guardar un nuevo libro
async function saveLlibres(req, res) {
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
}

// Obtener libros por rango de fechas
async function getByDate(req, res) {
  try {
    const { dataini, datafi } = req.params;
    
    const llibres = await Llibres.find({
      anyPublicacio: { $gte: dataini, $lte: datafi }
    });

    if (llibres.length === 0) {
      return res.status(404).json({ message: 'No books found in this date range' });
    }

    res.status(200).json(llibres);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book', error: err.message });
  }
}

// Exportar funciones
module.exports = { getLlibres, saveLlibres, getByDate };
