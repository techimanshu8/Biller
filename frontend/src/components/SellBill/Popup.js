import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import DataTable from "../DataTable";
import { columns } from "./Popupcolumns";
export default function Popup(props) {
	const { openPopup, setOpenPopup, HandlePopup, resdata } = props;
//console.log(resdata);
	const actions = [
		{
			icon: "save",
			tooltip: "More Details",
			onClick: (event, rowData) => {
				HandlePopup(rowData);
				//console.log(TotalBill);
				// history.push("/sellbill", {
				// 	data: data,
				// 	rowData: custData,
				// 	TotalBill: TotalBill,
				// 	TotalTax: TotalTax,
				// });
				//console.log(rowData);
				setOpenPopup(false);
			},
		},
	];
	return (
		<Dialog open={openPopup}>
			<DialogTitle>
				<div>Choose Product</div>
			</DialogTitle>
			<DialogContent>
				<DataTable
					data={resdata}
					columns={columns}
					actions={actions}
				></DataTable>
				<button onClick={() => setOpenPopup(false)}>Cancel</button>
			</DialogContent>
		</Dialog>
	);
}
