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
		title: "Quantity",
		field: "Quantity",
	},
	{
		title: "Unit",
		field: "Unit",
	},
	{
		title: "MRP",
		field: "MRP",
	},
	// {
	// 	title: "GST",
	// 	field: "gst",
	// },

	{
		title: "Selling Price Rate",
		field: "Selling_Price",
	},
	// {
	// 	title: "Total Discount",
	// 	field: "Discount",
	// },
];
