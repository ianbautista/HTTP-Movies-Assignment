import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialFormValues = {
	title: "",
	director: "",
	metascore: "",
	stars: [],
};

export default function MovieAdd(props) {
	const [formValues, setFormValues] = useState(initialFormValues);
	const history = useHistory();

	const onInputChange = (event) => {
		const { name } = event.target;
		const { value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const newMovieValues = {
			...formValues,
			stars: formValues.stars.split(/,/),
		};
		axios
			.post(`http://localhost:5000/api/movies`, newMovieValues)
			.then(() => {
				props.getMovieList();
				history.push(`/`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<form onSubmit={onSubmit} className="update">
			<h2>Add A Movie</h2>

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

			<button type="submit" onSubmit={onSubmit}>
				Add
			</button>
		</form>
	);
}
