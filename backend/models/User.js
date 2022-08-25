import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  UserId:{
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  verificationToken: {
    type: String,
  },
  verificationValid: {
    type: Date,
  },
});

/*
 * TODO: Add relevant middleware here to speed up and simplify processes
 * Also look at relevant virtuals!
 */

export default model('user', UserSchema);
