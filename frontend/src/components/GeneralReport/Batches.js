import "./GeneralReport.css";
import Navbar from "../Home/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { columns } from "./BatchTable";
import DataTable from "../DataTable";
import { BatchList1, BatchList2 } from "./BatchList";
import { useAuth } from "../../contexts/AuthContext";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import BatchCard from "./BatchCard";
const config = require("../../config/apipaths.json");

export default function Batches(props) {
	const [data, setData] = useState([{}]);
	const [open, setOpen] = useState(false);
	const [newsp, setNewsp] = useState();
	const [rowData, setRowData] = useState();
	//setRowData(props.location.state.rowData);
	const row = props.location.state.rowData;
	//console.log(row);
	const { currentUser } = useAuth();
	useEffect(
		/*async*/ () => {
			//console.log(props.location.state.jwt);
			//console.log(row);
			async function fetchData() {
				await axios
					.get(config.batchDetails, {
						params: {
							ItemCode: row._id,
						},
						headers: {
							"x-auth-token": currentUser,
						},
					})
					.then((res) => {
						//let temp =res.data;
						let r = res.data;
						//console.log(r);
						for (let i = 0; i < r.length; i++) {
							let disc = ((r[i].MRP - r[i].Selling_Price) * 100) / r[i].MRP;

							disc=disc.toFixed(2);
							r[i].Discount = disc;
							let exp = "N/A";
							if (r[i].Expiry) exp = r[i].Expiry.substring(0, 10);
                            r[i].Date= r[i].Date.substring(0, 10);
							r[i].Expiry = exp;
							//console.log(disc);
							// let t = {
							// 	num: i + 1,
							// 	barcode: r[i].Batch_Id,
							// 	quantity: r[i].Quantity,
							// 	expiry: exp,
							// 	rate: r[i].Cost_price,
							// 	mrp: r[i].MRP,
							// 	basicPrice: r[i].Selling_price,
							// 	discount: disc,
							// 	cgst: r[i].CGST,
							// 	sgst: r[i].SGST,
							// 	igst: r[i].IGST,
							// 	hsncode: r[i].HSN_Code,
							// 	purchasedate:r[i].Date.substring(0,10)
							// };
							// temp.push(t);
						}
						setData(r);
					});
			}
			fetchData();
		},
		[open,currentUser,row._id]
	);
	const actions = [
		{
			icon: "more",
			tooltip: "More Details",
			onClick: (event, rowData) => {
				setOpen(true);
				setRowData(rowData);
				console.log(rowData);
			},
		},
	];
	const OK = async () => {
		console.log(rowData.Barcode,newsp);
		await axios
			.get(config.updatebatch, {
				headers: {
					"x-auth-token": currentUser,
				},
				params: {
					NewPrice: newsp,
					Barcode: rowData.Barcode,
				},
			})
			.then((res) => {
				console.log(res);
				setOpen(false);
			});
		
	};

	return (
		<div>
			<Navbar title='Batch Report' />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "25px 200px",
					padding: "0px 0px 25px",
				}}
			>
				{Object.keys(BatchList1).map(function (keyName, keyIndex) {
					return <BatchCard title={BatchList1[keyName]} value={row[keyName]} />;
				})}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "25px 0px",
					padding: "0px 0px 25px",
				}}
			>
				{Object.keys(BatchList2).map(function (keyName, keyIndex) {
					return <BatchCard title={BatchList2[keyName]} value={row[keyName]} />;
				})}
			</div>
			<hr
				style={{
					color: "grey",
					backgroundColor: "grey",
					height: "3px",
					margin: "25px 0px 0px",
				}}
			/>

			<DataTable
				title='Item Detail Report'
				columns={columns}
				data={data}
				actions={actions}
			/>
			<Dialog open={open}>
				<DialogTitle>
					<div>New Selling Price</div>
				</DialogTitle>
				<DialogContent>
					<input
						onChange={(event) => {
							setNewsp(event.target.value);
						}}
					></input>
					<button onClick={OK}>OK</button>
					<button
						onClick={() => {
							setOpen(false);
						}}
					>
						Cancel
					</button>
				</DialogContent>
			</Dialog>
		</div>
	);
}
