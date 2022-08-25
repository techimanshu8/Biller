import { useState, useEffect } from "react";
import DataTable from "../DataTable";
import { columns } from "./Table.js";
import { useHistory } from "react-router-dom";
import AddSupplier from "../Supplier/AddSupplier";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Billing from "../Billing";
const config = require("../../config/apipaths.json");

function Purchasebill(props) {
	const history = useHistory();
	const [data, setData] = useState([{}]);
	const [addSupplier, setAddSupplier] = useState(false);
	const { currentUser } = useAuth();
	useEffect(() => {
		async function fetchData() {
			await axios
				.get(config.supplierDetails, {
					headers: {
						"x-auth-token": currentUser,
					},
				})
				.then((res) => {
					setData(res.data);
				});
		}
		fetchData();
	}, [addSupplier,currentUser]);
	const actions = [
		{
			icon: "description",
			tooltip: "Purchase Bill",
			onClick: (event, rowData) => {
				history.push("/purchasebill", { rowData: rowData });
			},
		},
	];
	return (
		<div className='customer'>
				<Billing/>
			{/* <div className='heading'>
				<h1> Bill No. : 001</h1>
			</div>
			<Search title='Customer Name' />
			<div className='addc'>
				<button> Add Customer</button>
			</div>
			<div className='details'>
				{details.map((item, index) => {
					return <Input field={item.field} key={index} />;
				})}
			</div>
			<hr className='hr-style' /> */}
			<div>
				<button onClick={() => setAddSupplier(true)}> Add Supplier</button>
			</div>
			<DataTable
				title='Choose Supplier for Purchase Bill'
				columns={columns}
				actions={actions}
				data={data}
			/>
			<AddSupplier
				addSupplier={addSupplier}
				setAddSupplier={setAddSupplier}
				jwt={props.jwt}
			/>
			{/* <DataTable title='Billing' columns={columns} />
			<div className='bottom'>
				<h1>
					Total payment: <input type='text'></input>
				</h1>
				<h1>
					Total Savings: <input type='text'></input>
				</h1>
				<button> Pay</button>
				<button> Generate </button>
			</div> */}
		</div>
	);
}

export default Purchasebill;
