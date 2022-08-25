import './Damagedgoodsreturnbill.css';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { columns }  from './Table';
import DataTable from '../DataTable';
import axios from "axios";
import Billing from "../Billing";
import { useAuth } from "../../contexts/AuthContext";
const config = require("../../config/apipaths.json");
export default function Damagedgoodsreturnbill(props) {
    const history = useHistory();
	const { currentUser } = useAuth();
	const [data, setData] = useState([{}]);
	useEffect(() => {
		async function fetchData() {
			await axios
				.get(config.supplierDetails, {
					headers: {
					  'x-auth-token': currentUser
					}},)
				.then((res) => {
					setData(res.data);
				});
		}
		fetchData();
	}, [currentUser]);
	const actions = [
		{
			icon: "more",
			tooltip: "Select for supplier return",
			onClick: (event, rowData) => {
				history.push("/stransactionhistory", { rowData: rowData ,jwt:props.jwt});
			},
		},
	];
	return (
		<div>
				<Billing/>
			<DataTable
				title='Choose Supplier for Return Bill'
				columns={columns}
				actions={actions}
				data={data}
			/>
		</div>
	);
}
