import { useState } from "react";

function BatchCard(props) {
	const [, setValue] = useState("");
	const OnChange = (event) => {
		setValue(event.target.value);
	};
	return (
		<div>
			<label className='name-label-supplier' style={{ paddingRight: "10px" }}>
				{props.title}:{" "}
			</label>
			<input
				type='text'
				value={props.value}
				style={{ marginRight: "90px" }}
				onChange={OnChange}
			/>
		</div>
	);
}

export default BatchCard;
