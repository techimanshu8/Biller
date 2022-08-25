export const columns = [
	{
		title: "Sr No",
		field: "num",
		render: (rowData) => rowData.tableData.id + 1,
	},
	{
		title: "Date",
		field: "Date",
	},
	{
		title: "Total Cost",
		field: "TotalCost",
	},
	// {
	// 	title: "Total Tax",
	// 	field: "TotalTax",
	// },
	// {
	// 	title: "Total",
	// 	field: "Total",
	// },
	{
		title: "Mode of Payment",
		field: "Mode",
	},
	{
		title: "Amount Paid",
		field: "Payment",
	},
];
