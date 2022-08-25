export const columns = [
	{
		title: "Sr No",
		field: "num",
		render: (rowData) => rowData.tableData.id + 1,
	},
	{
		title: "Barcode",
		field: "Barcode",
	},
	{
		title: "HSN Code",
		field: "HSN_Code",
	},
	{
		title: "Quantity",
		field: "Quantity",
	},
	{
		title: "Purchase Date",
		field: "Date",
	},
	{
		title: "Expiry Date",
		field: "Expiry",
	},
	{
		title: "Cost Price",
		field: "Cost_Price",
	},
	{
		title: "MRP",
		field: "MRP",
	},
	{
		title: "Selling Price",
		field: "Selling_Price",
	},
	{
		title: "% Discount",
		field: "Discount",
	},
	{
		title: "CGST",
		field: "CGST",
	},
	{
		title: "SGST",
		field: "SGST",
	},
	{
		title: "IGST",
		field: "IGST",
	},
];
