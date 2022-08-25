import { Schema, model } from "mongoose";

const SupplierSchema = Schema({
	UserId: {
		type: String,
		required: true,
	},
	Supplier_Id: {
		type: String,
		required: true,
		unique: true,
	},
	Name: {
		type: String,
		required: true,
	},
	Phone: {
		type: String,
		required: true,
	},
	GST_No: {
		type: String,
		required: true,
	},
	Address: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
	},
	Ledger: {
		type: Number,
		required: true,
	},
	// Array of Transaction Ids or bill id
});

export default model("supplier", SupplierSchema);
