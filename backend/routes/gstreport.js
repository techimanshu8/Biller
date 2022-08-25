import bill from "../models/Bill";
import Purchasebill from "../models/PurchaseBill";
import mongoose from "mongoose";
import { Router } from "express";
const router = Router();
import { validationResult } from "express-validator";
const userAuth = require("../middleware/userAuth");
router.get("/gstreport", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		let { date1,date2 } = req.query;
		let UserId;
		if (req.user && (UserId = req.user.id));
		if (typeof date1 == "undefined"||typeof date2 == "undefined") {
			return res.status(200).send("Please enter apropriate Date");
		}		
		let transaction1 = await bill.find({
			UserId: UserId,
			Date: { $gte: date1, $lte:date2},
		});
		let transaction2 = await Purchasebill.find({
			UserId: UserId,
			Date: { $gte: date1, $lte: date2},
		});
		//console.log( typeof("2021-04-30T13:12:41.185+00:00"));
		// console.log(transaction1,transaction2);
		// let transaction = [];
		// transaction.push(transaction1);
		// transaction.push(transaction2)
		// console.log(transaction1, transaction2);
		return res.status(200).send([transaction1, transaction2]);
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});

export default router;
