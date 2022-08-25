import bill from "../models/Bill";
import PurchaseBill from "../models/PurchaseBill";
import mongoose from "mongoose";


const schema = new mongoose.Schema({_id:String, seq: Number });
const counter = mongoose.model('counter', schema);

function code() {
	let str = Math.floor(Math.random() * 1000000000).toString();
	return str;
}
function generatecode() {
	var Bill_Id = code();
	var flag = true;
	while (flag) {
		let temp = bill.find({ Bill_Id });
		if (temp) {
			Bill_Id = code();
		}
		flag = false;
	}
	return Bill_Id;
}
function generatecodepurchase() {
	var Bill_Id = code();
	var flag = true;
	while (flag) {
		let temp = PurchaseBill.find({ Bill_Id });
		if (temp) {
			Bill_Id = code();
		}
		flag = false;
	}
	return Bill_Id;
}
async function getNextSequence(name) {
  let ret = await counter.findByIdAndUpdate(name,
          { $inc: { seq: 1 } },
            { new: true }
   );
   console.log(ret);
    return ret.seq ;
}
module.exports = { generatecode, generatecodepurchase, getNextSequence };
