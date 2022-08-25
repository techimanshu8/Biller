import { Schema, model } from "mongoose";

const BatcheSchema = Schema({
	UserId: {
		type: String,
		required: true,
	},
	Barcode: {
		type: String, //used as barcode also
		required: true,
	},
	Date: {
		type: Date,
		required: true,
	},
	ItemCode: {
		type: String,
		required: true,
	},
	Quantity: {
		type: Number,
		required: true,
	},
	Cost_Price: {
		type: Number,
		required: true,
	},
	Selling_Price: {
		type: Number,
		required: true,
	},
	MRP: {
		type: Number,
		required: true,
	},
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
	HSN_Code: {
		type: String,
		required: true,
	},
	Expiry: {
		type: Date,
	},
});

export default model("batch", BatcheSchema);
