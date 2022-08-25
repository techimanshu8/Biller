import { useState } from "react";
import "./Customer/customer.css";
export default function Input(props) {
	const [value, setValue] = useState("");
	const OnChange = (event) => {
		setValue(event.target.value);
	};
	return (
		<div style={{ padding: "30px 20px 30px 20px" }}>
			<label>{props.field} </label>
			<input
				onChange={OnChange}
				value={props.value}
				type='text'
				readOnly
				style={{ fontWeight: "bold" }}
			/>
		</div>
	);
}
