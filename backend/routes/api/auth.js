import { Router } from 'express';
const router = Router();
import { check, validationResult } from 'express-validator';
const config = require('config');
import crypto from 'crypto';
import User from '../../models/User';
import { sign } from 'jsonwebtoken';
import { compare, genSalt, hash } from 'bcryptjs';
import userAuth from '../../middleware/userAuth';
import mongoose from 'mongoose';
import sendMail from '../../utils/mail/sendMail';
import { confirm, forgot } from '../../utils/mail/templateMail';
import { ErrorCode } from '../../utils/consts';

// @route       POST api/user/register
// @desc        Create/Add a new user
// @access      Public
router.post(
  '/register',
  //**********************************Validations**********************************/
  [
    check('name', 'Name is required').not().isEmpty(),

    check('email', 'Please input valid email').isEmail(),

    check('password', 'Please enter a password with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      console.log("Hiii");
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
    }

    try {
      //**********************************Handler Code**********************************/

      const { email, name, password } = req.body;
      let user = await User.findOne({ email });
      const salt = await genSalt(10);

      if (user) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json({ errors: { msg: 'User Already Exists' } });
      }
      const UserId="67";
      const avatar = config.get('avatarBaseURI') + name.replace(' ', '+');
      const verificationToken = crypto.randomBytes(128).toString('hex');
      user = new User({
        name,
        UserId,
        email,
        password,
        avatar,
        verificationToken,
        verificationValid: Date.now() + 43200000,
      });

      user.password = await hash(password, salt);

      await user.save();
      sendMail(email, confirm(verificationToken));

      const payload = {
        user: {
          id: user.id,
          verified: false,
        },
      };

      sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
        console.log(token);
      });
    } catch (err) {
      console.log(err.message);
      res.status(ErrorCode.HTTP_SERVER_ERROR).json({ errors: { msg: 'Server Error!' } });
    }
  }
);

// @route       POST api/user/login
// @desc        Login/ Get auth token
// @access      Public
router.post(
  '/login',
  //**********************************Validations**********************************/
  [
    check('email', 'Please input valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
    }

    //**********************************Handler Code**********************************/

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json({ errors: { msg: 'Invalid Credentials' } });
      }

      const cresentialCheck = await compare(password, user.password);
      if (!cresentialCheck) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json({ errors: { msg: 'Invalid Credentials' } });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token, emailVerified: user.emailVerified });
      });
    } catch (err) {
      console.log(err.message);
      res.status(ErrorCode.HTTP_SERVER_ERROR).json({ errors: { msg: 'Server Error!' } });
    }
  }
);

// @route       POST api/user/forgot
// @desc        Forgot password mail trigger
// @access      Public
router.post(
  '/forgot',
  //**********************************Validations**********************************/
  [check('email', 'Please input valid email').isEmail()],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: { msg: errors.array() } });
    }

    //**********************************Handler Code**********************************/
    try {
      const { email } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json({ errors: { msg: 'Email Not Found' } });
      }
      const verificationToken = crypto.randomBytes(128).toString('hex');
      user.verificationToken = verificationToken;
      user.verificationValid = Date.now() + 43200000;
      await sendMail(email, forgot(verificationToken));
      await user.save();
      res.json({ success: 'Email Sent!' });
    } catch (err) {
      console.log(err.message);
      res.status(ErrorCode.HTTP_SERVER_ERROR).json({ errors: { msg: 'Server Error!' } });
    }
  }
);

// @route       GET api/user/confirm/:verificationToken
// @desc        Confirmation for verification and reset password
// @access      Public
router.get('/confirm/:verificationToken', async (req, res) => {
  try {
    const { verificationToken } = req.params;
    let user = await User.findOne({ verificationToken });

    if (!user) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json({ errors: { msg: 'Token Invalid' } });
    }

    if (Date.now() - Date.parse(user.verificationValid) > 0) {
      user.verificationToken = '';
      user.verificationValid = null;
      await user.save();
      return res
        .status(ErrorCode.HTTP_FORBIDDEN)
        .json({ errors: { msg: 'Token Expired!' } });
    }
    user.verificationToken = '';
    user.verificationValid = null;
    user.emailVerified = true;
    await user.save();
    return res.json({ emailVerification: !user.emailVerified });
  } catch (err) {
    console.log(err.message);
    res.status(ErrorCode.HTTP_SERVER_ERROR).json({ errors: { msg: 'Server Error!' } });
  }
});

// @route       POST api/user/
// @desc        Get user details
// @access      Public
router.get('/', userAuth, async (req, res) => {
  try {
    const user = await User.findOne(mongoose.Types.ObjectId(req.user.id));
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(ErrorCode.HTTP_SERVER_ERROR).json({ errors: { msg: 'Server Error!' } });
  }
});

export default router;
