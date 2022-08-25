import connectDB from "../config/dbConnector";

import batches from "../models/batches";
import item from "../models/Item";
import bill from "../models/Bill";
import PurchaseBill from "../models/PurchaseBill";
import mongoose from "mongoose";
import supplier from "../models/supplier";
import customer from "../models/Customer";

batches.updateMany(
	{ UserId: "4584548524" },

	{ $set: { UserId: "60770545cb52f750c8e697e2" } }
);

connectDB();
