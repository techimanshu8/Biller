import { Schema, model } from "mongoose";

const ItemSchema = Schema({
	UserId: {
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
	Category: {
		type: String,
		required: true,
	},
	Type: {
		type: String,
		//required: true,
	},
	NotifLimit:{
		type:Number,
		default:5
	},
	Total_Units: { type: Number, min: 0 },
	Weight_Volume: {
		type: String,
		required: true,
	},
	Description: {
		type: String,
	},
	Unit: { type: String },
	Batches: {
		type: Number,
		default: 0,
	}, //Array of Batch Ids
});

export default model("item", ItemSchema);
