import { Schema, model } from "mongoose";

const CustomerSchema = Schema({
	UserId: {
		type: String,
		required: true,
	},
	Customer_Id: {
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
	Address: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
	},
	Ledger: {
		type: String,
		required: true,
	},
});

export default model("customer", CustomerSchema);
