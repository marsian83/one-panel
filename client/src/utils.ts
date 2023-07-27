import fs from "fs";
import bcrypt from "bcryptjs";

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

export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem("onepanel_JWT_stored", token);
}

export function getTokenFromLocalStorage() {
  const localCookie = localStorage.getItem("onepanel_JWT_stored");
  if (!localCookie) return false;
  return localCookie;
}

export function clearTokenFromLocalStorage() {
  localStorage.removeItem("onepanel_JWT_stored");
}

export function getDateDifferenceString(unixTimestamp: number): string {
  const now = Date.now();
  const diffInMillis = now - unixTimestamp;

  const ONE_DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
  const daysAgo = Math.floor(diffInMillis / ONE_DAY_IN_MILLIS);

  if (daysAgo === 0) {
    return "today";
  } else if (daysAgo === 1) {
    return "yesterday";
  } else if (daysAgo < 31) {
    return `${daysAgo} days ago`;
  } else {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${monthsAgo} months ago`;
  }
}

export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (match) {
    return {
      r: parseInt(match[1], 16) / 255,
      g: parseInt(match[2], 16) / 255,
      b: parseInt(match[3], 16) / 255,
    };
  }
  return null;
}

export function isColorLight(hexColor: string): boolean {
  const rgbColor = hexToRgb(hexColor);
  if (!rgbColor) {
    throw new Error("Invalid hex color code");
  }

  const { r, g, b } = rgbColor;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.5;
}
