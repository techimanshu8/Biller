import { useState, useEffect } from "react";
import DataTable from "../DataTable";
import { columns } from "./Table.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import AddCustomer from "../Customer/AddCustomer";
import Billing from "../Billing";
const config = require("../../config/apipaths.json");

export default function SellBill(props) {
	const history = useHistory();
	const [data, setData] = useState([{}]);
	const [addCustomer, setAddCustomer] = useState(false);
	const { currentUser } = useAuth();
	useEffect(() => {
		async function fetchData() {
			//console.log(props.jwt);
			await axios
				.get(config.customerDetails, {
					headers: {
						"x-auth-token": currentUser,
					},
				})
				.then((res) => {
					setData(res.data);
				});
		}
		fetchData();
	}, [addCustomer,currentUser]);
	const actions = [
		{
			icon: "description",
			tooltip: "Select for Sell Billing",
			onClick: (event, rowData) => {
				history.push("/sellbill", { rowData: rowData });
			},
		},
	];
	return (
		<div className='customer'>
			<Billing />
			<div>
				<button onClick={() => setAddCustomer(true)}> Add Customer</button>
			</div>
			<DataTable
				title='Choose Customer for Sell Bill'
				columns={columns}
				actions={actions}
				data={data}
			/>
			<AddCustomer
				addCustomer={addCustomer}
				setAddCustomer={setAddCustomer}
				jwt={props.jwt}
			></AddCustomer>
		</div>
	);
}
