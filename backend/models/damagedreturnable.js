import { Schema, model } from "mongoose";

const damagedReturnableSchema = Schema({
	UserId: {
		type: String,
		required: true,
	},
	Batch_Id: {
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
	Name: {
		type: String,
		required: true,
	},
	Company: {
		type: String,
		required: true,
	},
	Line: {
		type: String,
		required: true,
	},
	Type: {
		type: String,
		required: true,
	},
	Weight_Volume: {
		type: String,
		required: true,
	},
	Quantity: {
		type: Number,
		required: true,
	},
	Cost_price: {
		type: Number,
		required: true,
	},
	Selling_price: {
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

export default model("damaged", damagedReturnableSchema);
