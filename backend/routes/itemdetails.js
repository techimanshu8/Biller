import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import User from "../models/User";
import Items from "../models/Item";
import batch from "../models/batches";
import supplier from "../models/supplier";
import mongoose from "mongoose";
const userAuth = require("../middleware/userAuth");
router.post("/items", async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const item = new Items({
			UserId: req.body.UserId,
			Name: req.body.Name,
			Company: req.body.Company,
			Line: req.body.Line,
			Type: req.body.Type,
			Total_Units: req.body.Total_Units,
			Weight_Volume: req.body.Weight_Volume,
			Batches: req.body.Batches,
		});
		await item.save();
		res.status(200).send(item._id);
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.get("/itemsbyid", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
	}
	try {
		const { ItemCode } = req.query;
		const _id = ItemCode;
		let UserId;
		if (req.user && (UserId = req.user.id));
		//console.log(req.query);
		//console.log(UserId);
		let item = await Items.find({ UserId, _id });
		if (item) {
			//console.log(JSON.stringify(item));
			return res.status(200).json(item);
		} else {
			return res.status(200).send("Item not found");
		}
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.get("/items", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
	}
	try {
		let UserId;
		if (req.user && (UserId = req.user.id));
		// const re = await batch.updateMany(
		// 	{},
		// 	{
		// 		$rename: {
		// 			//Cost_price: "Cost_Price",
		// 			//Selling_price: "Selling_Price",
		// 			Batch_Id: "Barcode",
		// 		},
		// 	}
		// );
		// console.log(re);
		// await Items.updateMany(
		// 	{},
		// 	{
		// 		$rename: { Line: "Category" },
		// 	}
		// );s
		//console.log(UserId);
		//const { UserId } = req.query;
		//console.log(req.query);
		//console.log(UserId);
		// await Items.updateMany(
		// 	{ UserId: "60770545cb52f750c8e697e2" },
		// 	{ Unit: "Pieces" }
		// );
		//await supplier.updateMany({}, { $rename: { phone: "Phone" } });
		let item = await Items.find({ UserId: UserId });
		//console.log(item.length);
		//console.log(item[0]);
		if (item) {
			//console.log(JSON.stringify(item));
			return res.status(200).json(item);
		} else {
			return res.status(200).send("Item not found");
		}
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.get("/itemsdiminishingnotif", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
	}
	try {
		// const { UserId } = req.query;
		let UserId;
		if (req.user && (UserId = req.user.id));
		//console.log(req.query);
		//console.log(UserId);
		//await Items.updateMany({}, { UserId: "4584548524", Batches: 0 });
		//let item = await Items.find({ UserId, Total_Units: { $lte: 5} });
		let item=[];
		await Items.find({ UserId}).then((r)=>{
			r.forEach((e)=>{
				if(e.Total_Units<=e.NotifLimit)
				item.push(e);
			});
		});
		if (item) {
			//console.log(JSON.stringify(item));
			return res.status(200).json(item);
		} else {
			return res.status(200).send("Item not found");
		}
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.get("/notiflimit",userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		let UserId;
		if (req.user && (UserId = req.user.id));
		const{ItemCode,limit}=req.query;
		console.log(ItemCode,limit);
		Items.updateOne({UserId:UserId,_id:ItemCode},{$set:{NotifLimit:limit}},
				function (err, result) {
					console.log(result);
					if (err) {
						console.log(err);
						return res.status(200).send("Error Occured in Notif Limit Update");
					}
				});
		res.status(200).send();
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
export default router;
