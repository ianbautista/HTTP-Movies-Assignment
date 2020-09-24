import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import MovieUpdate from "./Movies/MovieUpdate";
import MovieAdd from "./Movies/MovieAdd";

const App = () => {
	const [savedList, setSavedList] = useState([]);
	const [movieList, setMovieList] = useState([]);

	const getMovieList = () => {
		axios
			.get("http://localhost:5000/api/movies")
			.then((res) => setMovieList(res.data))
			.catch((err) => console.log(err.response));
	};

	const addToSavedList = (movie) => {
		setSavedList([...savedList, movie]);
	};

	useEffect(() => {
		getMovieList();
	}, []);

	return (
		<>
			<img
				src="https://clipartion.com/wp-content/uploads/2015/11/image-gallery-for-family-movie-clipart-1024x524.png"
				alt="movie reel"
			/>
			<SavedList list={savedList} />

			<Route exact path="/">
				<MovieList movies={movieList} />
			</Route>

			<Route path="/movies/:id">
				<Movie addToSavedList={addToSavedList} getMovieList={getMovieList} />
			</Route>

			<Route path="/update-movie/:id">
				<MovieUpdate getMovieList={getMovieList} />
			</Route>

			<Route exact path="/add-movie">
				<MovieAdd getMovieList={getMovieList} />
			</Route>
		</>
	);
};

export default App;
