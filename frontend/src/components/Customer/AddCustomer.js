import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext";
const config = require("../../config/apipaths.json");

export default function AddCustomer(props) {
	const {addCustomer, setAddCustomer } = props;
	const [Name, setName] = useState("");
	const [Email, setEmail] = useState(" ");
	const [Phone, setPhone] = useState(" ");
	const [Address, setAddress] = useState(" ");
	const [Ledger, setLedger] = useState(0);
	const { currentUser } = useAuth();
	const handleSubmit = (event) => {
		axios
			.post(
				config.addCustomer,
				{
					Name: Name,
					Phone: Phone,
					Address: Address,
					Email: Email,
					Ledger: Ledger,
				},
				{
					headers: {
						"x-auth-token": currentUser,
					},
				}
			)
			.then((res) => {
				console.log(res);
				setAddCustomer(false);
			})
			.catch((err) => console.log(err));
	};
	return (
		<Dialog open={addCustomer}>
			<DialogTitle>
				<div>Add Customer</div>
			</DialogTitle>
			<DialogContent>
				<label>
					Name:
					<input
						type='text'
						value={Name}
						onChange={(event) => setName(event.target.value)}
					/>
				</label>
				<label>
					Phone:
					<input
						type='text'
						value={Phone}
						onChange={(event) => setPhone(event.target.value)}
					/>
				</label>
				<label>
					Email:
					<input
						type='text'
						value={Email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</label>
				<label>
					Address:
					<input
						type='text'
						value={Address}
						onChange={(event) => setAddress(event.target.value)}
					/>
				</label>
				<label>
					Ledger:
					<input
						type='text'
						value={Ledger}
						onChange={(event) => setLedger(event.target.value)}
					/>
				</label>
				<button onClick={handleSubmit}>Submit</button>
				<button onClick={() => setAddCustomer(false)}>Cancel</button>
			</DialogContent>
		</Dialog>
	);
}
