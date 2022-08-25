import bill from "../models/Bill";
import Purchasebill from "../models/PurchaseBill";
import item from "../models/Item";
import { Router } from "express";
const router = Router();
import { validationResult } from "express-validator";
const userAuth = require("../middleware/userAuth");

router.get("/getCustomerbill", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const { Customer_Id } = req.query;
		let UserId;
		if (req.user && (UserId = req.user.id));
		let transactions = await bill.find({ UserId, Customer_Id });

		return res.status(200).json(transactions);
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.get("/getbybillid", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const {Bill_Id } = req.query;
		let UserId;
		if (req.user && (UserId = req.user.id));
		let transactions = await bill.find({ UserId, Bill_Id });

		return res.status(200).json(transactions);
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.get("/getPurchasebill", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const { Supplier_Id } = req.query;
		let UserId;
		if (req.user && (UserId = req.user.id));
		let transaction = await Purchasebill.find({ UserId, Supplier_Id });
		console.log(transaction);
		return res.status(200).json(transaction);
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.get("/getPurchasebillbyid", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const {  Bill_Id } = req.query;
		let UserId;
		if (req.user && (UserId = req.user.id));
		let transaction = await Purchasebill.findOne({  Bill_Id });
		console.log(transaction);
		return res.status(200).json(transaction);
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});

export default router;
