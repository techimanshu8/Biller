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
		required: true,
	}, // customer or supplier id
	Items: [
		{
			Barcode: {
				type: String,
				required: true,
			},
			HSN_Code: {
				type: String,
				required: true,
			},
			Name: {
				type: String,
				required: true,
			},
			Company: {
				type: String,
				required: true,
			},
			Weight_Volume: {
				type: String,
				required: true,
			},
			ItemCode: String,
			Quantity: {
				type: Number,
				required: true,
			},
			Cost_Price: {
				type: Number,
				required: true,
			},
			// Unit_Price: {
			// 	type: Number,
			// 	required: true,
			// },
			Unit: { type: String },
			SGST: {
				type: Number,
				default: 0,
			},
			CGST: {
				type: Number,
				default: 0,
			},
			IGST: {
				type: Number,
				default: 0,
			},
			Tax: {
				type: Number,
			},
			//Net_Price: { type: Number },
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

export default model("PurchaseBill", BillSchema);
