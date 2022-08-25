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
	Customer_Id: {
		type: String,
		required: true,
	},
	Items: [
		{
			Barcode: {
				type: String,
				required: true,
			},
			Purchase_Date:{
                type:Date
			},
			ItemCode: { type: String },
			Quantity: {
				type: Number,
				required: true,
			},
			Selling_Price: {
				type: Number,
				required: true,
			},
			Returned: {
				type: Number,
				required: true,
			},
		},
	],
	Date: {
		type: Date,
		required: true,
	},
});

export default model("returnbill", BillSchema);
