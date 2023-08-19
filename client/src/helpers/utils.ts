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

export function getHashCodeFromStringInsecurely(str: string) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

export async function hashPassword(
  password: string,
  saltRounds = 10
): Promise<string> {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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

export function parseObjectString(inputString: string) {
  try {
    const parsedObject = JSON.parse(inputString);
    return parsedObject;
  } catch (error: any) {
    console.error("Error parsing the input string:", error.message);
    return null;
  }
}

export function purifyJson(impureJson: string) {
  const pureJson = impureJson
    // Replace ":" with "@colon@" if it's between double-quotes
    .replace(/:\s*"([^"]*)"/g, function (match, p1) {
      return ': "' + p1.replace(/:/g, "@colon@") + '"';
    })

    // Replace ":" with "@colon@" if it's between single-quotes
    .replace(/:\s*'([^']*)'/g, function (match, p1) {
      return ': "' + p1.replace(/:/g, "@colon@") + '"';
    })

    // Add double-quotes around any tokens before the remaining ":"
    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

    // Turn "@colon@" back into ":"
    .replace(/@colon@/g, ":");

  return pureJson;
}
export function str2blks_MD5(str: string) {
  let nblk = ((str.length + 8) >> 6) + 1;
  let blks = new Array(nblk * 16);
  for (let i = 0; i < nblk * 16; i++) blks[i] = 0;
  for (let i = 0; i < str.length; i++) {
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
    blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  }
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

export function rhex(num: number) {
  var hex_chr = "0123456789abcdef";
  let str = "";
  for (let j = 0; j <= 3; j++)
    str +=
      hex_chr.charAt((num >> (j * 8 + 4)) & 0x0f) +
      hex_chr.charAt((num >> (j * 8)) & 0x0f);
  return str;
}

export function updateNestedObject(
  keys: string[],
  obj: object,
  newValue: any
): object {
  if (keys.length === 1) {
    return { ...obj, [keys[0]]: newValue };
  }

  const [currentKey, ...remainingKeys] = keys;
  return {
    ...obj,
    [currentKey]: updateNestedObject(
      remainingKeys,
      obj[currentKey as keyof typeof obj],
      newValue
    ),
  };
}

export function getNestedValue(keys: string[], obj: object) {
  let nestedValue = obj;

  for (const key of keys) {
    if (nestedValue.hasOwnProperty(key)) {
      nestedValue = nestedValue[key as keyof typeof nestedValue];
    } else {
      // Handle cases where the key doesn't exist in the object
      return {};
    }
  }

  return nestedValue;
}

export function convertISTToUnix(ist: string) {
  const istDateString = ist;

  const istDate = new Date(istDateString);

  const istOffsetHours = 5;
  const istOffsetMinutes = 30;

  const localDate = new Date(
    istDate.getUTCFullYear(),
    istDate.getUTCMonth(),
    istDate.getUTCDate(),
    istDate.getUTCHours() - istOffsetHours,
    istDate.getUTCMinutes() - istOffsetMinutes,
    istDate.getUTCSeconds()
  );

  return localDate.getTime();
}
