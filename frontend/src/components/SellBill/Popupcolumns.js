export const columns = [
	{
		title: "Sr No",
		field: "nums",
		render: (rowData) => rowData.tableData.id + 1,
	},
	{
		title: "Category",
		field: "Category",
	},
	{
		title: "Name",
		field: "Name",
	},
	// {
	// 	title: "Barcode",
	// 	field: "barcode",
	// },
	{
		title: "Company",
		field: "Company",
	},
	{
		title: "Wt/Vol",
		field: "Weight_Volume",
	},
	{
		title: "Purchase_Date",
		field: "Purchase_Date",
	},
];
