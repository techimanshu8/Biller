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
			Company: {
				type: String,
				required: true,
			},
			Name: {
				type: String,
				required: true,
			},
			Weight_Volume: {
				type: String,
				required: true,
			},
			HSN_Code: {
				type: String,
				//required: true,
			},
			ItemCode: String,
			Quantity: {
				type: Number,
				required: true,
			},
			Selling_Price: {
				type: Number,
				required: true,
			},
			Unit: { type: String },
			CGST: {
				type: Number,
				default: 0,
			},
			SGST: {
				type: Number,
				default: 0,
			},
			IGST: {
				type: Number,
				default: 0,
			},
			Purchase_Date:{
                type:Date,
				//default:0
			},
			Tax: {
				type: Number,
			},
			Net_Price: { type: Number },
		},
	],
	Date: {
		type: Date,
		required: true,
	},
	Payment: {
		type: Number,
		required: true,
	},
	// TotalTax: {
	// 	type: Number,
	// 	required: true,
	// },
	TotalCost: {
		type: Number,
		required: true,
	},
	Mode: String,
});

export default model("bill", BillSchema);
