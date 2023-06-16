import fs from "fs";
import bcrypt from "bcrypt";

export function readPortFromConfig(callback: (port: number | false) => void) {
  const filePath = "../config.json";

  // Read the JSON file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      callback(false);
      return;
    }

    // Parse the JSON data
    try {
      const jsonData = JSON.parse(data);
      const port = jsonData.port || false;
      callback(port);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      callback(false);
    }
  });
}

export async function hashPassword(
  password: string,
  saltRounds = 10
): Promise<string> {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    // Handle any errors during the hashing process
    throw new Error(`Error hashing password: ${error}`);
  }
}
