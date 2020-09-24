import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
	const [movie, setMovie] = useState(null);
	const params = useParams();
	const history = useHistory();

	const fetchMovie = (id) => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => setMovie(res.data))
			.catch((err) => console.log(err.response));
	};

	const saveMovie = () => {
		props.addToSavedList(movie);
	};

	// update movies
	const updateMovie = (id) => {
		history.push(`/update-movie/${id}`);
	};
	// delete movie
	const deleteMovie = (id) => {
		axios
			.delete(`http://localhost:5000/api/movies/${id}`)
			.then((res) => {
				props.getMovieList();
				history.push(`/`);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchMovie(params.id);
	}, [params.id]);

	if (!movie) {
		return <div>Loading movie information...</div>;
	}

	return (
		<div className="save-wrapper">
			<MovieCard movie={movie} />

			<div type="button" className="save-button" onClick={saveMovie}>
				Save
			</div>

			{/* edit button */}
			<div type="button" className="edit-button" onClick={() => updateMovie(params.id)}>
				Edit
			</div>

			{/* delete button */}
			<div type="butoon" className="delete-button" onClick={() => deleteMovie(params.id)}>
				Delete
			</div>
		</div>
	);
}

export default Movie;
