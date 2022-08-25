import "./GeneralReport.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { columns } from "../GeneralReport/Table";
import DataTable from "../DataTable";
import { useAuth } from "../../contexts/AuthContext";
import Report from "../Reports";
//import { tempData } from "./tempData";
const config = require("../../config/apipaths.json");
//import { fetchItems } from "../../api/fetchitems";
export default function GeneralReport(props) {
	const [data, setData] = useState([{}]);
	const history = useHistory();
	const { currentUser } = useAuth();
	useEffect(() => {
		async function fetchData() {
			//console.log(props.jwt);
			await axios
				.get(config.fetchItems, {
					headers: {
						"x-auth-token": currentUser,
					},
				})
				.then((res) => {
					//console.log("frae");
					//console.log(res.data);
					//setItems(res.data);
					//let temp = [];
					setData(res.data);
					//console.log(items[0].Line);
					// for (let i = 0; i < res.data.length; i++) {
					// 	let t = {
					// 		batch: res.data[i].Batches,
					// 		num: i + 1,
					// 		category: res.data[i].Line,
					// 		name: res.data[i].Name,
					// 		//barcode:items.Batches[0],
					// 		company: res.data[i].Company,
					// 		productType: res.data[i].Type,
					// 		WtVol: res.data[i].Weight_Volume,
					// 		total: res.data[i].Total_Units,
					// 		itemcode: res.data[i]._id,
					// 	};
					// 	temp.push(t);
					// 	//console.log(temp);
					// }
					//console.log("Here");
					//etData(temp);
					//data=res.data;
					//console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		fetchData();
	}, [currentUser]);

	const actions = [
		{
			icon: "more",
			tooltip: "More Details",
			onClick: (event, rowData) => {
				history.push("/batches", { rowData: rowData });
			},
		},
	];
	function onRowUpdate(newData, oldData) {
		const dataUpdate = [...data];
		const index = oldData.tableData.id;
		dataUpdate[index] = newData;
		setData([...dataUpdate]);
	}

	return (
		<div className='Report'>
			<Report/>
			{/* {() => callAPI()} */}
			{/* <button onClick={() => callAPI()}> Refresh </button> */}
			<DataTable
				title='General Report'
				columns={columns}
				data={data}
				//data={tempData}
				actions={actions}
				onRowUpdate={onRowUpdate}
			/>
		</div>
	);
}
