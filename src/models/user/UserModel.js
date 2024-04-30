import UserSchema from "./UserSchema.js";

// inser user
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

//get user by email
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};
