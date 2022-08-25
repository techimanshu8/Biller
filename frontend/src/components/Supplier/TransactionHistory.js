import Navbar from "../Home/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { columns } from "./BillTable";
import DataTable from "../DataTable.js";
import Transactions from "./transactionHistary";
import axios from "axios";
const config = require("../../config/apipaths.json");
export default function SupplierTransactionHistory(props) {
	const row = props.location.state.rowData;

	console.log(row);
	const [,setBillids]=useState([]);
	const { currentUser } = useAuth();
	const [data, setData] = useState();
	const [open, setOpen] = useState(false);
	const[rowData,setRowData]=useState({Bill_Id:""});
	const title = "Transaction History of " + row.Name;
	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(config.getPurchasebill, {
					params: {
						Supplier_Id: row.Supplier_Id,
					},
					headers: {
						"x-auth-token": currentUser,
					},
				})
				.then((res) => {
					let bills=[];
					console.log(res.data);
					let tempdata = res.data;
					tempdata.forEach((t) => {
						//t.Total = parseFloat(t.TotalCost) + parseFloat(t.TotalTax);
						t.Date = t.Date.substring(0, 10);
						bills.push(t.Bill_Id);
					});

					console.log(bills);
					setBillids(bills);
					setData(tempdata);
				});
		};
		fetchData();
	}, [currentUser,row.Supplier_Id]);
	const actions = [
		{
			icon: "more",
			tooltip: "More Details",
			onClick: (event, rowData) => {
				setRowData(rowData);
				console.log(rowData);
				setOpen(true);
			},
		},
	]
	return (
		<div>
			<Navbar title='Transaction History' />
			<DataTable title={title} columns={columns} data={data} actions={actions}/>
			<Transactions BillId={rowData.Bill_Id} Supplier_Id={row.Supplier_Id} openPopup={open} setOpen={setOpen}/>
			{/* {billids.map((e) => {
				return <Transactions BillId={e} Supplier_Id={row.Supplier_Id}/>;
			})} */}
		</div>
	);
}
