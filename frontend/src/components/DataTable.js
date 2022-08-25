import MaterialTable from "material-table";
import React from "react";

export default function DataTable(props) {
	var isLoading;
	if (props.isLoading) {
		isLoading = props.isLoading;
	}
	let len = 0;

	if (props.data && props.data.length > 0) {
		len = props.data.length;
	}
	
	let options = {
		// filtering: true,
		paging: true,
		pageSize: 10,
		pageSizeOptions: [10, 50, 100, 500, { value: len, label: "All" }],
		exportButton: true,
	};
	if (props.options) {
		options = props.options;
	}
	return (
		<React.Fragment>
			<MaterialTable
				// cellEditable={{
				// 	cellStyle: {},
				// 	onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
				// 		return new Promise((resolve, reject) => {
				// 			console.log('newValue: ' + newValue);
				// 			setTimeout(resolve, 4000);
				// 		});
				// 	}
				// }}
				title={props.title}
				data={props.data}
				columns={props.columns}
				actions={props.actions}
				options={options}
				isLoading={isLoading}
			/>
		</React.Fragment>
	);
}
