import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import User from "../models/User";
import item from "../models/Item";
import batches from "../models/batches";
import mongoose from "mongoose";
import generatecode from "../controllers/generatebarcode";
const userAuth=require('../middleware/userAuth');
router.get("/getbarcode", async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const BarCode = generatecode();
		res.status(200).send(BarCode);
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.post("/addbatch", async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const {
			UserId,
			ItemCode,
			Quantity,
			Cost_price,
			Selling_price,
			MRP,
			HSN_Code,
			CGST,
			SGST,
			IGST,
			Expiry,
			Batch_Id,
		} = req.body;

		let batch = new batches({
			UserId: UserId,
			Date: Date.now(),
			Batch_Id: Batch_Id,
			ItemCode: ItemCode,
			Quantity: Quantity,
			Cost_price: Cost_price,
			Selling_price: Selling_price,
			MRP: MRP,
			HSN_Code: HSN_Code,
			CGST: CGST,
			SGST: SGST,
			IGST: IGST,
			Expiry: Expiry,
		});
		await batch.save();
		//console.log(Quantity);
		// ==========Updating releted field============
		item.findByIdAndUpdate(
			ItemCode,
			{
				$inc: { Total_Units: Quantity, Batches: 1 },
				//$inc: { Batches: 1 },
			},
			(err, docs) => {
				if (err) {
					console.log(err);
				} else {
					//console.log("Updated User : ", docs);
				}
			}
		);
		//console.log(result);

		return res.status(200).send(batch);
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.get("/getbatch",userAuth, async (req, res) => {
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
		if(req.user&&(UserId=req.user.id));
		const { ItemCode } = req.query;
		let batch = await batches.find({ ItemCode, UserId });
		//console.log("sdf");
		if (batch) {
			//console.log(batch);
			//console.log(batch);
			return res.status(200).send(batch);
		} else {
			return res.status(200).send("Batch not found");
		}
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});

router.get('/updatebatch',userAuth, async(req,res)=>{
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
		if(req.user&&(UserId=req.user.id));
		const {Barcode,NewPrice}= req.query;
		console.log(Barcode,UserId,NewPrice);
		await batches.updateOne({Barcode:Barcode,UserId:UserId},
			{
			$set: { Selling_Price:NewPrice },
			},
		function (err, result) {
			if (err) {console.log(err);
				return res.status(200).send("Some Error occured in Updating Price");
			}
			console.log(result);
			return res.status(200).send("Price Updated Succesfully");

		});


	} catch (err) {
		console.log(err);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
		
	}

});
export default router;
