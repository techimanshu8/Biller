import { verify } from "jsonwebtoken";
import { ErrorCode, errorWrapper } from "../utils/consts";
const config = require("config");
const mongoose = require("mongoose");
let userAuth = async (req, res, next) => {
	const token = req.header("x-auth-token");

	if (!token) {
		return res
			.status(ErrorCode.HTTP_NOT_AUTH)
			.json(errorWrapper("Token Not Found"));
	}

	try {
		await verify(token, config.get("jwtSecret"), (error, decoded) => {
			if (error) {
				res
					.status(ErrorCode.HTTP_NOT_AUTH)
					.json(errorWrapper("Token is not valid"));
			} else {
				req.user = decoded.user;

				next();
			}
		});
	} catch (err) {
		console.error("Token Error " + err.message);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper("Server Error"));
	}
};

//export default userAuth;
module.exports = userAuth;

// import { verify } from 'jsonwebtoken';
// import { ErrorCode } from '../utils/consts';
// const config = require('config');

// let userAuth = async (req, res, next) => {
//   const token = req.header('x-auth-token');

//   if (!token) {
//     return res
//       .status(ErrorCode.HTTP_NOT_AUTH)
//       .json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     await verify(token, config.get('jwtSecret'), (error, decoded) => {
//       if (error) {
//         res.status(ErrorCode.HTTP_NOT_AUTH).json({ msg: 'Token is not valid' });
//       } else {
//         req.UserId= decoded.UserId;
//         next();
//       }
//     });
//   } catch (err) {
//     console.error('Token Error ' + err.message);
//     res.status(ErrorCode.HTTP_SERVER_ERROR).json({ errors: { msg: 'Server Error' } });
//   }
// };

// export default userAuth;
