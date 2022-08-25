import Customer from "../models/Customer";
import bill from "../models/Bill";
import mongoose from "mongoose";
import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import { getNextSequence } from "../controllers/generatebillno";
const userAuth = require("../middleware/userAuth");

router.get("/customer", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		//	console.log(req.user.id);
		let UserId;
		if (req.user && (UserId = req.user.id));
		// const UserId="4584548524";
		let customer = await Customer.find({ UserId });
		//console.log(customer);
		if (customer) {
			// let transactions = bill
			// 	.find({ Client_id: customer.Customer_Id })
			// 	.sort({ date: -1 })
			// 	.limit(10);
			// customer.transactions = transactions;
			return res.status(200).send(customer);
		} else {
			return res.status(200).send("Customer details not found");
		}
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});

router.post("/addcustomer", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const { Name, Phone, Address, Email, Ledger } = req.body;
		let UserId;
		if (req.user && (UserId = req.user.id));
		let customer = new Customer({
			UserId: UserId,
			Customer_Id: await getNextSequence("Customerid"),
			Name: Name,
			Phone: Phone,
			Address: Address,
			Email: Email,
			Ledger: Ledger,
		});
		await customer.save();
		//console.log(customer);
		return res.status(200).send("New Customer Added Successfully");
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
export default router;
