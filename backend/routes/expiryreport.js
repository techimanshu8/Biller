import item from "../models/Item";
import batches from "../models/batches";
import { Router } from "express";
const router = Router();
import { validationResult } from "express-validator";
const userAuth = require("../middleware/userAuth");
router.get("/expiry",userAuth, async (req, res) => { 
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const { start, end} = req.query;
		if (typeof start == "undefined"||typeof end == "undefined") {
			return res.status(200).send("Please enter apropriate Date");
		}
		let batch;
		let UserId;
		if (req.user && (UserId = req.user.id));
		// let Items = [];
		console.log(start,end,UserId);
		await batches.find(
			{ $and: [{ Expiry: { $lte: end } }, { Expiry: { $gte: start } },{UserId:UserId}] },
			function (err, result) {
				if (err) throw err;
				batch = result;
			}
		);
		// console.log(batch);
		// for (let i = 0; i < batch.length; i++) {
		// 	let itemcode = batch[i].ItemCode;
		// 	await item
		// 		.findById(itemcode, function (err, result) {
		// 			console.log(result);
		// 			Items.push(result);
		// 		})
		// 		.select({ Batches: 0, UserId: 0 });
		// }
		// if (Items) {
			// batch.push(Items);
			return res.status(200).send(batch);
		// }
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
export default router;
