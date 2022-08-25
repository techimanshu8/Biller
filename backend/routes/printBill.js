import { Router } from "express";
const router = Router();
import { validationResult } from "express-validator";
// import createPdf from '../controllers/generatepdf' ;
const ejs = require("ejs");
const pdf = require("html-pdf");
let path = require("path");
const fs = require("fs");

router.post("/Print", async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res
			.status(ErrorCode.HTTP_BAD_REQ)
			.json({ errors: errors.array() })
			.send("Error in Validation");
	}
	try {
		ejs.renderFile(
			path.join(__dirname, "../models/", "template.ejs"),
			req.body.data,
			(err, Phtml) => {
				if (err) {
					// res.send(err);
					console.log(err);
				} else {
					let options = {
						height: "11.25in",
						width: "8.25in",
					};
					// console.log(datapd);
					pdf
						.create(Phtml, options)
						.toFile(
							`./pdf/Bill${req.body.data.Billno}.pdf`,
							function (err, data) {
								if (err) {
									console.log(err);
								} else {
									console.log("File Creteated Succesfully");
									var pdf = fs.readFileSync(data.filename);
									res.contentType("application/pdf");
									res.send(pdf);
								}
							}
						);
				}
			}
		);
		// var data =fs.readFileSync('./public/modules/datacollectors/output.pdf');
	} catch (err) {
		console.log(err);
	}
});

export default router;
