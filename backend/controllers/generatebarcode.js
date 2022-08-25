import batches from "../models/batches";
import mongoose from "mongoose";
import connectDB from "../config/dbConnector";
function code() {
	let str = Math.floor(Math.random() * 1000000000).toString();
	return str;
}
function generatecode() {
	var flag = true;
	var Batch_Id = code();
	while (flag) {
		let temp = batches.find({ Batch_Id });
		if (temp) {
			Batch_Id = code();
		}
		flag = false;
	}
	return Batch_Id;
}
export default generatecode;
