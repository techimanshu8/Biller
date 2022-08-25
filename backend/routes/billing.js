import { Router } from "express";
const router = Router();
import { validationResult } from "express-validator";
import batches from "../models/batches";
import bill from "../models/Bill";
import PurchaseBill from "../models/PurchaseBill";
import returnbill from "../models/customerreturn";
import preturnbill from "../models/purchasereturn";
import item from "../models/Item";
import supplier from "../models/supplier";
import customer from "../models/Customer";
import {
	generatecode,
	generatecodepurchase,
} from "../controllers/generatebillno";
const userAuth = require("../middleware/userAuth");
const ObjectId = require("mongodb").ObjectID;

router.get("/getitembybarcode", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const { Barcode } = req.query;
		let UserId;
		if (req.user && (UserId = req.user.id));
		let batch = await batches.find({ Barcode, UserId });
		//console.log("sdf");
		if (batch.length > 0) {
			//console.log(batch);
			//console.log(batch);
			return res.status(200).send(batch);
		} else {
			return res.status(204).send("Item not found");
		}
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});
router.post("/sale", userAuth, async (req, res) => {
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
			Items,
			Customer_Id,
			Mode,
			TotalCost,
			TotalTax,
			Payment,
			Ledger,
		} = req.body;
		let UserId;
		console.log(Items);
		if (req.user && (UserId = req.user.id));
		let Bill_Id = generatecode();
		let Bill = new bill({
			UserId: UserId,
			Bill_Id: Bill_Id,
			Customer_Id: Customer_Id,
			Items: Items,
			Date: Date.now(),
			TotalCost: TotalCost,
			//TotalTax: TotalTax,
			Mode: Mode,
			Payment: Payment,
		});
		Bill.save();
		//Now Updating Releted fields in Batch, Item , Customer , Supplier
		Items.forEach((ele) => {
			let dec = ele.Quantity * -1;
			//console.log(dec);
			batches
				.updateOne({ Barcode: ele.Barcode,Date:ele.Purchase_Date,UserId:UserId }, { $inc: { Quantity: dec } })
				.then((res) => console.log("Res:" + res))
				.catch((err) => console.log("Err:" + err));
			item
				.updateOne(
					{ _id: ObjectId(ele.ItemCode) },
					{ $inc: { Total_Units: dec } }
				)
				.then((res) => console.log("Res:" + res))
				.catch((err) => console.log("Err:" + err));
		});

		customer.updateOne(
			{ Customer_Id: Customer_Id },
			{
				$set: { Ledger },
			},
			function (err, result) {
				if (err) {
					console.log(err);
				}
				console.log(result);
			}
		);

		return res.status(200).send(Bill);
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});

// =================Purchase Billing===================

router.post("/purchase", userAuth, async (req, res) => {
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
			Supplier_Id,
			Mode,
			TotalCost,
			TotalTax,
			Payment,
			Ledger,
			data,
		} = req.body;
		let UserId;
		if (req.user && (UserId = req.user.id));
		console.log(Ledger);
		let Items = [];
		data.forEach((element) => {
			if (element.ItemCode.length == 0) {
				const items = new item({
					UserId: UserId,
					Name: element.Name,
					Company: element.Company,
					Category: element.Category,
					Type: element.Type,
					Total_Units: 0,
					Unit: element.Unit,
					Weight_Volume: element.Weight_Volume,
					Batches: 0,
				});
				items.save();
				element.ItemCode = items._id;
				console.log(items._id);
			}
			const batch = new batches({
				UserId: UserId,
				ItemCode: element.ItemCode,
				Date: Date.now(),
				Quantity: element.Quantity,
				Cost_Price: element.Cost_Price,
				Selling_Price: element.Selling_Price,
				MRP: element.MRP,
				HSN_Code: element.HSN_Code,
				CGST: element.CGST,
				SGST: element.SGST,
				IGST: element.IGST,
				Expiry: element.Expiry,
				Barcode: element.Barcode,
			});
			batch.save();
			item.findByIdAndUpdate(
				element.ItemCode,
				{
					$inc: { Total_Units: element.Quantity, Batches: 1 },
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
			console.log("Hi");
			let gst = parseFloat(element.IGST);
			if (gst == 0) {
				gst = parseFloat(element.CGST) + parseFloat(element.SGST);
			}
			let x, cgst, sgst, igst;
			x =
				(parseFloat(element.Cost_Price) * 100.0) /
				(100 +
					parseFloat(element.CGST) +
					parseFloat(element.SGST) +
					parseFloat(element.IGST));
			cgst =
				(parseFloat(element.CGST) * x * parseFloat(element.Quantity)) / 100;
			sgst =
				(parseFloat(element.SGST) * x * parseFloat(element.Quantity)) / 100;
			igst =
				(parseFloat(element.IGST) * x * parseFloat(element.Quantity)) / 100;
			let t = {
				Barcode: element.Barcode,
				HSN_Code: element.HSN_Code,
				CGST: cgst,
				Cost_Price: element.Cost_Price,
				SGST: sgst,
				IGST: igst,
				ItemCode: element.ItemCode,
				Weight_Volume: element.Weight_Volume,
				Quantity: element.Quantity,
				Name: element.Name,
				Company: element.Company,
				// Unit_Price: element.Cost_Price,
				Tax: cgst + sgst + igst,
				Unit: element.Unit,
				// Net_Price:
				// 	(parseFloat(element.Cost_Price) * gst) / 100 +
				// 	parseFloat(element.Cost_Price),
			};
			//console.log(x,t);
			Items.push(t);
		});
		//console.log(Items);
		let Bill_Id = generatecodepurchase();
		let Bill = new PurchaseBill({
			UserId: UserId,
			Bill_Id: Bill_Id,
			Supplier_Id: Supplier_Id,
			Items: Items,
			Date: Date.now(),
			TotalCost: TotalCost,
			//TotalTax: TotalTax,
			Mode: Mode,
			Payment: Number(Payment),
		});
		await Bill.save();
		//Now Updating Releted fields in Batch, Item , Customer , Supplier
		supplier.updateOne(
			{ Supplier_Id: Supplier_Id },
			{
				$set: { Ledger },
			},
			function (err, result) {
				if (err) console.log(err);
				//console.log(result);
			}
		);

		return res.status(200).send("Purchase Added Sccesfully");
	} catch (err) {
		console.log(err.message);
		res
			.status(ErrorCode.HTTP_SERVER_ERROR)
			.json({ errors: { msg: "Server Error!" } });
	}
});

router.post("/customerreturn", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const { Items, Customer_Id, Billno, returned } = req.body;
		let UserId;
console.log(Items);
		if (req.user && (UserId = req.user.id));
		let Bill_Id = generatecode();
		let Bill = new returnbill({
			UserId: UserId,
			Bill_Id: Bill_Id,
			Customer_Id: Customer_Id,
			Items: Items,
			Date: Date.now(),
		});
		Bill.save();
let flag=false;
		let ele = Items[0];
await bill.findOne({ Bill_Id: Billno }).then((r)=>{
	r.Items.forEach((e)=>{
		if(e.Barcode===ele.Barcode && JSON.stringify(e.Purchase_Date)===JSON.stringify(ele.Purchase_Date))
		{
			if(e.Quantity<Number(ele.Quantity)){
				flag=true;
			return res.status(400).send("Quantity returned cannot be more than quantity bought");
		}
			else{
			e.Quantity=e.Quantity-Number(ele.Quantity);
			e.Net_Price=e.Net_Price-(ele.Selling_Price *Number(ele.Quantity));
			}
		}
	});
	if(!flag){
		console.log(ele.Selling_Price * -1*Number(ele.Quantity));
		 bill.updateOne(
			{ Bill_Id: Billno },
			{
				$set: { Items:r.Items},
				$inc: { TotalCost: ele.Selling_Price * -1*Number(ele.Quantity) },
			},
			function (err, result) {
				if (err) {
					console.log(err);
					return res.status(200).send("Error Occured in Item Deletion");
				}
			}
		);
	}
	});
if(!flag){
		await item.updateOne(
			{ _id: ele.ItemCode },
			{ $inc: { Total_Units: ele.Quantity } },
			function (err, result) {
				if (err) {
					console.log(err);
					return res.status(200).send("Error Occured in Updating Item");
				}
			}
		);

		await batches.updateOne(
			{ UserId: UserId, Barcode: ele.Barcode,Date:ele.Purchase_Date },
			{
				$inc: { Quantity: ele.Quantity },
			},
			function (err, result) {
				console.log(result);
				if (err) {
					console.log(err);
					return res.status(200).send("Error in Batches Updating");
				}
			}
		);
		return res.status(200).send("Return Bill Added Sccesfully");
}
	} catch (err) {
		console.log(err);
		return res.status(200).send("Return Bill Addition failed");
	}
});

router.post("/purchasereturn", userAuth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		const { Items, Supplier_Id, Billno } = req.body;
		let UserId;
		console.log("supplier", Supplier_Id);
		if (req.user && (UserId = req.user.id));
		let Bill_Id = generatecode();
		let Bill = new preturnbill({
			UserId: UserId,
			Bill_Id: Bill_Id,
			Supplier_Id: Supplier_Id,
			Items: Items,
			Date: Date.now(),
		});
		Bill.save();
		let ele = Items[0];

		await PurchaseBill.updateOne(
			{ Bill_Id: Billno },
			{
				$pull: { Items: { Barcode: ele.Barcode } },
				$inc: { TotalCost: ele.Cost_Price * -1 },
			},
			function (err, result) {
				if (err) {
					console.log(err);
					return res.status(200).send("Error Occured in Item Deletion");
				}
			}
		);
		console.log(ele.ItemCode);
		await item.updateOne(
			{ _id: ele.ItemCode },
			{ $inc: { Total_Units: Number(ele.Quantity) * -1 } },
			function (err, result) {
				if (err) {
					console.log(err);
					return res.status(200).send("Error Occured in Updating Item");
				}
			}
		);

		await batches.updateOne(
			{ UserId: UserId, Barcode: ele.Barcode,Date:ele.Purchase_Date  },
			{
				$inc: { Quantity: Number(ele.Quantity) * -1 },
			},
			function (err, result) {
				if (err) {
					console.log(err);
					return res.status(200).send("Error in Batches Updating");
				}
			}
		);

		return res.status(200).send("Return Bill Added Sccesfully");
	} catch (err) {
		console.log(err);
		return res.status(200).send("Return Bill Addition failed");
	}
});

export default router;
