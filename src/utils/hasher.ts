import * as crypto from "crypto";
import * as argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config();

export const HashInfo = async (plainTextPassword: string) => {
  // Generate a secure random salt. For Argon2, a salt length of 16 bytes is recommended.
  const salt = crypto.randomBytes(16);

  try {
    const hash = await argon2.hash(plainTextPassword, { salt });
    return hash;
  } catch (err) {
    console.error("Error hashing info with salt:", err);
    throw err;
  }
};

export const CompareHash = async (
  hashPassword: any,
  plainTextPassword: string
) => {
  try {
    if (await argon2.verify(hashPassword, plainTextPassword)) {
      // The hash of the submitted password matches the stored hash
      console.log("verification succeeded!");
      return true;
    } else {
      // The hash of the submitted password does not match the stored hash
      console.log("verification failed!");
      return false;
    }
  } catch (err) {
    console.error("Error verifying info:", err);
    throw err;
  }
};
