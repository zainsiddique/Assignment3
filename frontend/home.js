document.addEventListener('DOMContentLoaded', function () {
    const movieContainer = document.querySelector('.movie-container');
    const addMovieForm = document.querySelector('#addMovieForm');
    const updateMovieForm = document.querySelector('#updateMovieForm');
    const addMovieModal = new bootstrap.Modal(document.getElementById('addMovieModal'));
    const updateMovieModal = new bootstrap.Modal(document.getElementById('updateMovieModal'));
  
    // Add a message element
    const messageElement = document.getElementById('message');
  
    // Function to update the message
    const updateMessage = (message, type = 'success') => {
      messageElement.textContent = message;
      messageElement.className = `alert alert-${type}`;
    };
  
    // Function to fetch and display movies
    const displayMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/movie/get');
        const movies = await response.json();
  
        // Clear existing content
        movieContainer.innerHTML = '';
  
        // Display movies
        movies.forEach((movie) => {
          const movieDiv = createMovieDiv(movie);
          movieContainer.appendChild(movieDiv);
        });
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };
  
    const createMovieDiv = (movie) => {
      const movieDiv = document.createElement('div');
      movieDiv.className = 'movie';
      movieDiv.innerHTML = `
        <h3>${movie.title}</h3>
        <div class="genre" style="display:flex">
          <p><strong>Genre:</strong> ${movie.genre} </p>
          <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
        </div>
        <p><strong>Rating:</strong> ${movie.rating}</p>
  
        <button class="btn btn-danger" onclick="deleteMovie('${movie._id}')">Delete</button>
        <button class="btn btn-warning" onclick="openUpdateModal('${movie._id}')">Update</button>
      `;
      return movieDiv;
    };
  
    // Function to handle movie deletion
    window.deleteMovie = async (id) => {
      console.log(id);
      try {
        await fetch(`http://localhost:4000/movie/delete/${id}`, {
          method: 'DELETE',
        });
        displayMovies();
        updateMessage('Movie deleted successfully.', 'success');
      } catch (error) {
        console.error('Error deleting movie:', error.message);
        updateMessage('Error deleting movie.', 'danger');
      }
    };
  
    // Function to open update modal and fetch movie details
    window.openUpdateModal = async (id) => {
      try {
        const response = await fetch(`http://localhost:4000/movie/get/${id}`);
        const movie = await response.json();
  
        // Populate update form with movie details
        updateMovieForm.elements['updateTitle'].value = movie.title;
        updateMovieForm.elements['updateGenre'].value = movie.genre;
        updateMovieForm.elements['updateReleaseYear'].value = movie.releaseYear;
        updateMovieForm.elements['updateRating'].value = movie.rating;
        updateMovieForm.dataset.movieId = id; // Set the movie ID as a dataset attribute
  
        // Open the update modal
        updateMovieModal.show();
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
        updateMessage('Error fetching movie details.', 'danger');
      }
    };
  
    // Event listener for add movie form submission
    addMovieForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(addMovieForm);
      const newMovie = {};
      formData.forEach((value, key) => {
        newMovie[key] = value;
      });
  
      try {
        await fetch('http://localhost:4000/movie/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMovie),
        });
        displayMovies();
        addMovieModal.hide();
        addMovieForm.reset();
        updateMessage('Movie added successfully.', 'success');
        location.reload(); // Reload the page after adding a movie
      } catch (error) {
        console.error('Error adding movie:', error.message);
        updateMessage('Error adding movie.', 'danger');
      }
    });
  
    // Event listener for update movie form submission
    updateMovieForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(updateMovieForm);
      const updatedMovie = {};
      formData.forEach((value, key) => {
        updatedMovie[key] = value;
      });
  
      const movieId = updateMovieForm.dataset.movieId;
  
      try {
        await fetch(`http://localhost:4000/movie/update/${movieId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedMovie),
        });
        displayMovies();
        updateMovieModal.hide();
        updateMessage('Movie updated successfully.', 'success');
        location.reload(); // Reload the page after updating a movie
      } catch (error) {
        console.error('Error updating movie:', error.message);
        updateMessage('Error updating movie.', 'danger');
      }
    });
  
    // Initial display of movies
    displayMovies();
  });
  