const express = require("express");

const router = express.Router();

const movie = require("../Controller/MovieController");


router.post("/add",movie.createMovie);
router.get("/get", movie.getAllMovies);
router.delete("/delete/:id", movie.deleteMovie);
router.put("/update/:id", movie.updateMovie);
router.get("/get/:id", movie.getMovie);

module.exports = router;