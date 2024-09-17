// export const runtime = "node"
// import crypto from "crypto";


// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
// const ENCRYPTION_IV = process.env.ENCRYPTION_IV;

// if (!ENCRYPTION_KEY || !ENCRYPTION_IV) {
//     throw new Error("Encryption key or IV is not set in environment variables");
// }

// // Validate the length of the encryption key and IV
// if (ENCRYPTION_KEY.length !== 64 || ENCRYPTION_IV.length !== 32) {
//     throw new Error("Invalid encryption key or IV length");
// }

// const safeEncryptionKey = ENCRYPTION_KEY as string;
// const safeEncryptionIV = ENCRYPTION_IV as string;

// // Encryption function
// export function encryptToken(token: string): string {
//     const key = Buffer.from(safeEncryptionKey, "hex");
//     const iv = Buffer.from(safeEncryptionIV, "hex");
//     const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
//     let encrypted = cipher.update(token, "utf8", "hex");
//     encrypted += cipher.final("hex");
//     return encrypted;
// }

// // Decryption function 
// export function decryptToken(encryptedToken: string): string {
//     const key = Buffer.from(safeEncryptionKey, "hex");
//     const iv = Buffer.from(safeEncryptionIV, "hex");
//     const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
//     let decrypted = decipher.update(encryptedToken, "hex", "utf8");
//     decrypted += decipher.final("utf8");
//     console.log(decrypted)
//     return decrypted;
// }


// export function generateRandomContent() {
//     const randomString = crypto.randomBytes(16).toString("hex");
//     const date = new Date().toISOString();
//     return `Streak updated on: ${date}\nRandom content: ${randomString}`;
// }


// // const key = crypto.randomBytes(32);
// // const keyHex = key.toString("hex");

// // // Generate a 128-bit (16-byte) IV
// // const iv = crypto.randomBytes(16);
// // const ivHex = iv.toString("hex");

// // console.log("Encryption Key (hex):", keyHex);
// // console.log("Initialization Vector (hex):", ivHex);




// token-encryption.ts

// Remove the runtime directive and crypto import
// export const runtime = "node"
// import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ENCRYPTION_IV = process.env.ENCRYPTION_IV;

if (!ENCRYPTION_KEY || !ENCRYPTION_IV) {
  throw new Error("Encryption key or IV is not set in environment variables");
}

// Convert hex to Uint8Array
function hexToUint8Array(hex: string): Uint8Array {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

// Convert Uint8Array to hex
function uint8ArrayToHex(arr: Uint8Array): string {
  return Array.from(arr, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Encryption function
export async function encryptToken(token: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    hexToUint8Array(ENCRYPTION_KEY || ""),
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  const iv = hexToUint8Array(ENCRYPTION_IV || "");
  const encodedToken = new TextEncoder().encode(token);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    encodedToken
  );

  return uint8ArrayToHex(new Uint8Array(encryptedBuffer));
}

// Decryption function
export async function decryptToken(encryptedToken: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    hexToUint8Array(ENCRYPTION_KEY || ""),
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  const iv = hexToUint8Array(ENCRYPTION_IV || "");
  const encryptedData = hexToUint8Array(encryptedToken);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decryptedBuffer);
}

// Generate random content
export function generateRandomContent(): string {
  const randomArray = new Uint8Array(16);
  crypto.getRandomValues(randomArray);
  const randomString = uint8ArrayToHex(randomArray);
  const date = new Date().toISOString();
  return `Streak updated on: ${date}\nRandom content: ${randomString}`;
}

// export function generateRandomContent() {
//     const randomString = crypto.randomBytes(16).toString("hex");
//     const date = new Date().toISOString();
//     return `Streak updated on: ${date}\nRandom content: ${randomString}`;
// }