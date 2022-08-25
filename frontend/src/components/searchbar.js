import { useState } from "react";

export default function Search(props) {
	const [name, setName] = useState();
	const OnChange = (event) => {
		setName(event.target.value);
	};

	return (
		<form className='form'>
			<label style={{ paddingRight: "10px", fontWeight: "bolder" }}>
				{props.title}{" "}
			</label>
			<input
				value={name}
				onChange={OnChange}
				type='text'
				style={{ marginRight: "10px", fontSize: "25px" }}
			/>
			<button
				onClick={() => {
					props.OnSearch(name);
				}}
				style={{
					height: "40px",
					marginLeft: "20px",
					fontSize: "20px",
					padding: "5px",
				}}
			>
				Get Details
			</button>
		</form>
	);
}
