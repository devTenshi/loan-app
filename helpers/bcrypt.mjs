import bcrypt from "bcrypt";

export const comparePassword = async (string, hash) => {
     return bcrypt.compare(string, hash)
 }
