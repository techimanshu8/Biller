import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { columns } from "./TransactionTable";
import DataTable from "../DataTable.js";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
const config = require("../../config/apipaths.json");

export default function Transactions(props) {
	const[returned,setReturned]=useState();
	const[rowData,setRowData]=useState();
	const [data, setData] = useState([{}]);
	const [date, setDate] = useState("");
	const [quantity, setQuantity] = useState();
	const [open, setOpen] = useState(false);
	const { BillId } = props;
	const { currentUser } = useAuth();
	//console.log("Hi");
	useEffect(() => {
		async function fetchData() {
		if(BillId!==""){
		await axios
			.get(config.getbybillid, {
				params: {
					Bill_Id: BillId,
				},
				headers: {
					"x-auth-token": currentUser,
				},
			})
			.then((res) => {
				console.log(res);
				setDate(res.data[0].Date);
				setData(res.data[0].Items);
			});}}
			fetchData();
	}, [BillId,open,currentUser]);

	const actions = [
		{
			icon: "delete",
			tooltip: "return goods",
			onClick: (event, rowData) => {
				setOpen(true);
				setRowData(rowData);
				console.log(rowData);
			},
		},
	];
	const OK=async ()=>
	{
		console.log(currentUser);
		console.log(rowData);
		await axios
		.post(config.customerreturn, 
			 {
				Items:[{Barcode:rowData.Barcode,Purchase_Date:rowData.Purchase_Date,ItemCode: rowData.ItemCode,Selling_Price:rowData.Selling_Price,Returned:returned,Quantity:quantity }],
			Customer_Id:props.Customer_Id,
			Billno:BillId
			},{	headers: {
				'x-auth-token':currentUser,
			  }
		})
		.then((res) => {
			console.log(res);
			setOpen(false);
		});
	};
	return (
		<div>
			<Dialog open={props.openPopup}  style={{width:'1600px'}}>
			<DataTable
				title={"Date:" +date.substring(0, 10)}
				columns={columns}
				actions={actions}
				data={data}
			/>
			<Dialog open={open}>
				<DialogTitle>
				Returning Goods
				</DialogTitle>
				<DialogContent>
					<label>Money Returned:</label>
					<input onChange={(event)=>{setReturned(event.target.value)}}></input>
					<label>Quantity:
					<input type={Number} onChange={(event)=>{setQuantity(event.target.value)}}></input></label>
					<p>
					<button onClick={OK}>OK</button>
					<button
						onClick={() => {
							setOpen(false);
						}}
					>
						Cancel
					</button></p>
				</DialogContent>
			</Dialog>
			<button onClick={()=>{props.setOpen(false)}}>OK</button>
				</Dialog>
		</div>
	);
}
