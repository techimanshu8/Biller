import Navbar from "../Home/Navbar";
import { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import "./Supplier.css";
import { columns } from "../Supplier/Table";
import { useAuth } from "../../contexts/AuthContext";
import DataTable from "../DataTable";
import axios from "axios";
import AddSupplier from "./AddSupplier";
const config = require("../../config/apipaths.json");
export default function Supplier() {
	const history = useHistory();
	const [data, setData] = useState([{}]);
	const { currentUser } = useAuth();
	const [addSupplier, setAddSupplier] = useState(false);
	useEffect(() => {
		const fetchdata=async()=>{
		await axios
			.get(config.supplierDetails, {
				headers: {
					"x-auth-token": currentUser,
				},
			})
			.then((res) => {
				setData(res.data);
			});}
			fetchdata();
	}, [addSupplier,currentUser]);
	const actions = [
		{
			icon: "more",
			tooltip: "More Details",
			onClick: (event, rowData) => {
				history.push("/stransactionhistory", {
					rowData: rowData,
				});
				//console.log(rowData);
			},
		},
	];
	return (
		<div>
			<Navbar title='Supplier Details' />
			<div>
				<button onClick={() => setAddSupplier(true)}> Add Supplier</button>
			</div>
			<DataTable
				title='Supplier Table'
				columns={columns}
				actions={actions}
				data={data}
			/>
			<AddSupplier addSupplier={addSupplier} setAddSupplier={setAddSupplier} />
		</div>
	);
}
