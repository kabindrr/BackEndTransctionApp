import UserSchema from "./UserSchema.js";

// inser user
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};
