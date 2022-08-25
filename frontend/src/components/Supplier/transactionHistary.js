import { useState, useEffect } from "react";
import { columns } from "./TransactionTable";
import DataTable from "../DataTable.js";
import { useAuth } from "../../contexts/AuthContext";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import axios from "axios";
const config = require("../../config/apipaths.json");

export default function Transactions(props){

    const [data,setData] = useState([{}]);
	const[returned,setReturned]=useState();
	const[date,setDate]=useState("");
	const[,setMode]=useState();
	const[,setPayment]=useState();
	const [open,setOpen] = useState(false);
	const[rowData,setRowData]=useState();
	const { currentUser } = useAuth();
	const {BillId}=props;
	

    useEffect(() =>{
		const fetchdata=async()=>{
		//console.log(props.Supplier_Id);
		if(BillId!==""){
	console.log(BillId);
		await axios
			.get(config.getpurchasebillbyid, {
				params: {
                    Bill_Id:BillId ,
				},	headers: {
					'x-auth-token':currentUser,
				  }
			})
			.then((res) => {
				console.log(res);
				setDate(res.data.Date);
				setMode(res.data.Mode);
				setPayment(res.data.Payment);
				setData(res.data.Items);
			});}}
			fetchdata();
	}, [BillId,open,currentUser]);

    const actions = [
		{
			icon:"delete",
			tooltip:"return goods",
			onClick:(event,rowData)=>{
				setOpen(true);
				setRowData(rowData);
			}
		}
	];
	const OK=async ()=>
	{
		console.log(props);
		console.log(rowData);
		//console.log(Batch_Id:rowData.Batch_Id,ItemCode:rowData.ItemCode,Unit_Price:rowData.Unit_Price,returned);
		await axios
		.post(config.purchasereturn,
			 {
				Items:[{Barcode:rowData.Barcode,Purchase_Date:rowData.Purchase_Date,ItemCode:rowData.ItemCode,Cost_Price:rowData.Cost_Price,Returned:returned,Quantity:rowData.Quantity}],
			Supplier_Id:props.Supplier_Id,
			Billno:BillId
			}, {	headers: {
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
				{/* <p>{'Bill ID:'+BillId+",Date:"+date+",Mode of payment:"+mode+",Payment:"+payment}</p> */}
			<DataTable
				title={"Date:"+date.substring(0, 10)}
				columns={columns}
				actions={actions}
				data={data}
			/>
				<Dialog open={open}>
			<DialogTitle>
				<div>Money Returned</div>
			</DialogTitle>
			<DialogContent>
				<input onChange={(event)=>{setReturned(event.target.value)}}></input>
				<button onClick={OK}>OK</button>
			    <button onClick={()=>{setOpen(false)}}>Cancel</button>
			</DialogContent>
			</Dialog>
			<button onClick={()=>{props.setOpen(false)}}>OK</button>
			</Dialog>
		</div>
	);

}
