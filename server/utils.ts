import { Request } from "express";
import fs from "fs";

export function getAuthTokenFromHeader(req: Request): string | false {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return false;
  return token;
}

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
