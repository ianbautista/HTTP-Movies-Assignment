import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialFormValues = {
	title: "",
	director: "",
	metascore: "",
	stars: [],
};

export default function MovieUpdate(props) {
	const [formValues, setFormValues] = useState(initialFormValues);
	const history = useHistory();
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((response) => {
				console.log(response);
				const movieData = response.data;
				setFormValues({ ...movieData, stars: movieData.stars.join(", ") });
			})
			.catch((error) => console.log(error));
	}, [id]);

	const onInputChange = (event) => {
		const { name } = event.target;
		const { value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const updates = { ...formValues, stars: formValues.stars.split(/,/) };
		axios
			.put(`http://localhost:5000/api/movies/${id}`, updates)
			.then((response) => {
				console.log(response);
				props.getMovieList();
				history.push(`/movies/${id}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<form onSubmit={onSubmit} className="update-form">
			<h2>Update Movie Information</h2>

			<label>
				Title:&nbsp;
				<input
					type="text"
					placeholder="..."
					maxLength="60"
					name="title"
					value={formValues.title}
					onChange={onInputChange}
				/>
			</label>
			<label>
				Director:&nbsp;
				<input
					type="text"
					name="director"
					placeholder="..."
					maxLength="60"
					value={formValues.director}
					onChange={onInputChange}
				/>
			</label>
			<label>
				Metascore:&nbsp;
				<input
					type="text"
					name="metascore"
					placeholder="..."
					maxLength="3"
					value={formValues.metascore}
					onChange={onInputChange}
				/>
			</label>
			<label>
				Stars:&nbsp;
				<input
					type="text"
					name="stars"
					placeholder="..."
					maxLength="100"
					value={formValues.stars}
					onChange={onInputChange}
				/>
			</label>

			<button>Update</button>
		</form>
	);
}
