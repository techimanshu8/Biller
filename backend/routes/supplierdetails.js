import Supplier from "../models/supplier";
import bill from "../models/Bill";
import mongoose from "mongoose";
import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import { getNextSequence } from "../controllers/generatebillno";
const userAuth = require("../middleware/userAuth");
router.get("/supplier", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		// .send("Error in Validation");
	}
	try {
		// const { UserId } = req.query;
		let UserId;
		if (req.user && (UserId = req.user.id));
		let supplier = await Supplier.find({ UserId });
		if (supplier) {
			// let transactions = bill
			// 	.find({ Client_id: supplier.Supplier_Id })
			// 	.sort({ date: -1 })
			// 	.limit(10);
			// supplier.transactions = transactions;
			//console.log(supplier);
			return res.status(200).send(supplier);
		} else {
			return res.status(200).send("Supplier details not found");
		}
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});

router.post("/addsupplier", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const { Name, Phone, Gstno, Address, Email, Ledger } = req.body;
		let UserId;
		if (req.user && (UserId = req.user.id));
		let supplier = new Supplier({
			UserId: UserId,
			Supplier_Id: await getNextSequence("Supplierid"),
			Name: Name,
			Phone: Phone,
			GST_No: Gstno,
			Address: Address,
			Email: Email,
			Ledger: Ledger,
		});
		await supplier.save();
		console.log(supplier);
		return res.status(200).send("New Supplier Added Successfully");
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
export default router;
