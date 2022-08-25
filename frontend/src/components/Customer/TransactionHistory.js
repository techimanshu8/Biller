import Navbar from "../Home/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Transactions from "./transactionHistary";
import { columns } from "./BillTable";
import DataTable from "../DataTable.js";
import axios from "axios";
const config = require("../../config/apipaths.json");
export default function CustomerTransactionHistory(props) {
	const row = props.location.state.rowData;
	const { currentUser } = useAuth();
	const[rowData,setRowData]=useState({Bill_Id:""});
	const [data, setData] = useState();
	const [open, setOpen] = useState(false);
	const title = "Transaction History of " + row.Name;
	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(config.getbill, {
					params: {
						Customer_Id: row.Customer_Id,
					},
					headers: {
						"x-auth-token": currentUser,
					},
				})
				.then((res) => {
					//console.log(res);
					let bills=[];
					let tempdata = res.data;
					tempdata.forEach((t) => {
						//t.Total = parseFloat(t.TotalCost) + parseFloat(t.TotalTax);
						t.Date = t.Date.substring(0, 10);
						bills.push(t.Bill_Id);
					});
					console.log(bills);
					setData(tempdata);
				});
		};
		fetchData();
	}, [currentUser,row.Customer_Id]);
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
			<Transactions BillId={rowData.Bill_Id} Customer_Id={row.Customer_Id} openPopup={open} setOpen={setOpen}/>
			{/* {billids.map((e) => {console.log(e);
				return <Transactions BillId={e} Customer_Id={row.Customer_Id}/>;
			})} */}
		</div>
	);
}
