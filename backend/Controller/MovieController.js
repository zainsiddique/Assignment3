
const Movie = require('../Model/Movie');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single movie
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a movie
exports.createMovie = async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    rating: req.body.rating
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (req.body.title) {
      movie.title = req.body.title;
    }


    if (req.body.releaseYear) {
      movie.releaseYear = req.body.releaseYear;
    }

    if (req.body.genre) {
      movie.genre = req.body.genre;
    }

    if(req.body.rating){
        movie.rating = req.body.rating;
    }

    const updatedMovie = await movie.save();
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a movie
exports.deleteMovie = (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
      .then(() => res.json("Movie deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  };
