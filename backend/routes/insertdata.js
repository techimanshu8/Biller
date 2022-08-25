import { connect } from "mongoose";
import { Router } from "express";
import Items from "../models/Item";
import Batches from "../models/batches";
import batches from "../models/batches";
const router = Router();
const db =
	"mongodb+srv://goodztech:123456qwerty@cluster0.1zc0o.mongodb.net/test";
var XLSX = require("xlsx");

// const connectDB = async () => {
// 	try {
// 		await connect(db, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 			useFindAndModify: false,
// 			useCreateIndex: true,
// 		});
// 		console.log("DB Success");
// 	} catch (err) {
// 		console.error(err.message);
// 		process.exit(ErrorCode.DB_CONN_ERR);
// 	}
// };
router.get("/insert", async (req, res) => {
	//connectDB();
	var workbook = XLSX.readFile("demo.xlsx");
	var sheet_name_list = workbook.SheetNames;
	console.log(sheet_name_list); // getting as Sheet1

	sheet_name_list.forEach(function (y) {
		var worksheet = workbook.Sheets[y];
		//getting the complete sheet
		// console.log(worksheet);

		var headers = {};
		var data = [];
		var z;
		for (z in worksheet) {
			if (z[0] === "!") continue;
			//parse out the column, row, and value
			var col = z.substring(0, 1);
			// console.log(col);

			var row = parseInt(z.substring(1));
			// console.log(row);

			var value = worksheet[z].v;
			// console.log(value);

			//store header names
			if (row == 1) {
				headers[col] = value;
				// storing the header names
				continue;
			}

			if (!data[row]) data[row] = {};
			data[row][headers[col]] = value;
		}
		//drop those first two rows which are empty
		data.shift();
		data.shift();
		data.forEach((d) => {
			if (!d.Name) d.Name = "N/A";

			if (!d.Weight_Volume) d.Weight_Volume = "N/A";

			if (!d.Category) d.Category = "N/A";
			let item = new Items({
				UserId: "609908f12b540a2f9c0917ce",
				Name: d.Name,
				Company: d.Company,
				Category: d.Category,
				Type: d.Type,
				Total_Units: d.Total_Units,
				Weight_Volume: d.Weight_Volume,
				Description: d.Description,
				Unit: "Pieces",
				Batches: 1,
			});
			item.save();
			if (!d.Barcode) d.Barcode = "N/A";
			if (!d.Cost_Price) d.Cost_Price = 0;
			if (!d.Selling_Price) d.Selling_Price = 0;
			if (!d.MRP) d.MRP = 0;
			if (!d.GST) {
				d.CGST = 0;
				d.IGST = 0;
			} else {
				let str = d.GST;
				console.log(typeof str);
				//str = str.substring(0, 2);
				d.CGST = parseInt(str * 100) / 2;
				d.SGST = parseInt(str * 100) / 2;
			}
			let batch = new Batches({
				UserId: "609908f12b540a2f9c0917ce",
				Barcode: d.Barcode,
				Date: Date.now(),
				ItemCode: item.id,
				Quantity: d.Total_Units,
				Cost_Price: parseInt(d.Cost_Price),
				Selling_Price: parseInt(d.Selling_Price),
				MRP: d.MRP,
				CGST: d.CGST,
				SGST: d.SGST,
				IGST: 0,
				HSN_Code: "N/A",
			});
			batch.save();

			//Items.insertMany(d);
		});
		//console.log(data);

		res.send(data);
	});
});
// 609908f12b540a2f9c0917ce

export default router;
