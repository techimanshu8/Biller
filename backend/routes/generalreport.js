import item from '../models/Item';
import batches from '../models/batches';
import mongoose from 'mongoose';
import { Router } from "express";
const router = Router();
import { validationResult } from "express-validator";

router.get("/generalreport", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res
      .status(ErrorCode.HTTP_BAD_REQ)
      .json({ errors: errors.array() })
      .send("Error in Validation");
  }
  try {
    const { name, UserId } = req.body;
    let Item = await item.findOne({ Name: name, UserId: UserId });
    if (Item) {
      let itemcode = Item._id;
      let batch = await batches.find({ ItemCode: itemcode });
      Item.Batches = batch ;
      return res.status(200).send(Item);
    }
    else {
      return res.status(200).send("Item details not found");
    }
  } catch (err) {
    console.log(err.message);
    res
      .status(ErrorCode.HTTP_SERVER_ERROR)
      .json({ errors: { msg: "Server Error!" } });
  }
});

export default router ;