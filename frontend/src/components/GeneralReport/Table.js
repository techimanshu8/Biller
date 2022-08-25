
export const columns = [
	// {
	// 	cellStyle: {
	// 		width: 100,
	// 		maxWidth: 100,
	// 	},
	// 	headerStyle: {
	// 		width: 100,
	// 		maxWidth: 100,
	// 	},
	// },

	{
		title: "Sr No",
		field: "num",
		render: (rowData) => rowData.tableData.id + 1,
	},
	{
		title: "Name",
		field: "Name",
	},
	{
		title: "Batches",
		field: "Batches",

		// render: () => {
		// 	<Button >Button</Button>;
		// },
		// render: (rowdata) => {
		// 	<Link to='/'>view</Link>;
		// },
	},

	{
		title: "Category",
		field: "Category",
	},
	// {
	//     title:'Barcode', field:'barcode'
	// },
	{
		title: "Company",
		field: "Company",
	},
	{
		title: "Type",
		field: "Type",
	},
	{
		title: "Wt/Vol",
		field: "Weight_Volume",
	},
	// {
	//     title:'Quantity', field:'quantity'
	// },
	// {
	//     title:'Expiry Date', field:'expiry'
	// },
	// {
	//     title:'Purchase Rate', field:'quantity'
	// },
	// {
	//     title:'MRP', field:'product'
	// },
	// {
	//     title:'Tagged Selling Price', field:'basicPrice'
	// },
	// {
	//     title:'Special Discount', field:'discount'
	// },
	// {
	//     title:'CGST', field:'gst%'
	// },
	// {
	//     title:'IGST', field:'gst%'
	// },
	// {
	//     title:'SGST', field:'gst%'
	// },
	{
		title: "Total_Units",
		field: "Total_Units",
	},
	{
		title: "Unit",
		field: "Unit",
	},
	// {
	// 	title: "ItemCode",
	// 	field: "itemcode",
	// },
];
