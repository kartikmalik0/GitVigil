import crypto from "crypto";

// const key = crypto.randomBytes(32);
// const keyHex = key.toString("hex");

// // Generate a 128-bit (16-byte) IV
// const iv = crypto.randomBytes(16);
// const ivHex = iv.toString("hex");

// console.log("Encryption Key (hex):", keyHex);
// console.log("Initialization Vector (hex):", ivHex);
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ENCRYPTION_IV = process.env.ENCRYPTION_IV;

if (!ENCRYPTION_KEY || !ENCRYPTION_IV) {
    throw new Error("Encryption key or IV is not set in environment variables");
}

// Validate the length of the encryption key and IV
if (ENCRYPTION_KEY.length !== 64 || ENCRYPTION_IV.length !== 32) {
    throw new Error("Invalid encryption key or IV length");
}

const safeEncryptionKey = ENCRYPTION_KEY as string;
const safeEncryptionIV = ENCRYPTION_IV as string;

// Encryption function
export function encryptToken(token: string): string {
    const key = Buffer.from(safeEncryptionKey, "hex");
    const iv = Buffer.from(safeEncryptionIV, "hex");
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(token, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

// Decryption function 
export function decryptToken(encryptedToken: string): string {
    const key = Buffer.from(safeEncryptionKey, "hex");
    const iv = Buffer.from(safeEncryptionIV, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedToken, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
