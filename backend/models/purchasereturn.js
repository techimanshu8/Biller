import { Schema, model } from "mongoose";

const BillSchema = Schema({
	UserId: {
		type: String,
		required: true,
	},
	Bill_Id: {
		type: String,
		required: true,
		unique: true,
	},
	Supplier_Id: {
		type: String,
		//required: true,
	},
	Items: [
		{
			Barcode: {
				type: String,
			},
			Purchase_Date :{
             type:Date
			},
			ItemCode: { type: String },
			Quantity: {
				type: Number,
			},
			Cost_Price: {
				type: Number,
			},
			Returned: {
				type: Number,
			},
		},
	],

	Date: {
		type: Date,
		required: true,
	},
});

export default model("preturnbill", BillSchema);
