import Navbar from "../Home/Navbar";
import { useState, useEffect } from "react";
import "./customer.css";
import { columns } from "./Table.js";
import DataTable from "../DataTable.js";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import AddCustomer from "./AddCustomer";
import { useHistory } from "react-router-dom";
const config = require("../../config/apipaths.json");
export default function Customer(props) {
	console.log(props);
	const history = useHistory();
	const [data, setData] = useState([{}]);
	const [addCustomer, setAddCustomer] = useState(false);
	const { currentUser } = useAuth();
	useEffect(() => {
		//console.log(location.state.jwt);
		async function fetchData() {
		await axios
			.get(config.customerDetails, {
				headers: {
					"x-auth-token": currentUser,
				},
			})
			.then((res) => {
				console.log(res);
				setData(res.data);
			});}
			fetchData();
	}, [addCustomer,currentUser]);
	const actions = [
		{
			icon: "more",
			tooltip: "More Details",
			onClick: (event, rowData) => {
				history.push("/ctransactionhistory", {
					rowData: rowData,
				});
				//console.log(rowData);
			},
		},
	];
	return (
		<div>
			<Navbar title='Customer Details' />
			<div>
				<button onClick={() => setAddCustomer(true)}> Add Customer</button>
			</div>
			<DataTable
				title='Customer Table'
				columns={columns}
				actions={actions}
				data={data}
			/>
			<AddCustomer
				addCustomer={addCustomer}
				setAddCustomer={setAddCustomer}
			></AddCustomer>
		</div>
	);
}
