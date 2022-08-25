const ejs = require("ejs");
const pdf = require("html-pdf");
let path = require("path");
const fs = require("fs");

function PrintBill(data, filename, billNo) {
	ejs.renderFile(
		path.join(__dirname, "../models/", "template.ejs"),
		data,
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
					.toFile(`./pdf/Bill${billNo}.pdf`, function (err, data) {
						if (err) {
							console.log(err);
						} else {
							console.log("File Creteated Succesfully");
							var pdf = fs.readFileSync(filename);
						}
					});
			}
		}
	);
}
export default PrintBill;
