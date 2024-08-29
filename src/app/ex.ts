import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 byte key
const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY!), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY!), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// pages/api/github-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { encrypt } from '../../utils/encryption';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { token } = req.body;
    const encryptedToken = encrypt(token);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { githubToken: encryptedToken },
    });

    return res.status(200).json({ message: 'Token stored successfully' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/github-operations.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { decrypt } from '../../utils/encryption';
import { Octokit } from '@octokit/rest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { githubToken: true },
  });

  if (!user?.githubToken) {
    return res.status(400).json({ error: 'GitHub token not found' });
  }

  const decryptedToken = decrypt(user.githubToken);
  const octokit = new Octokit({ auth: decryptedToken });

  // Use octokit to perform GitHub operations
  // For example:
  // const { data } = await octokit.repos.createForAuthenticatedUser({ name: 'new-repo' });

  res.status(200).json({ message: 'GitHub operation successful' });
}




import crypto from 'crypto';

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function deriveKey(password: string, salt: string): Buffer {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
}

export function encrypt(text: string, key: Buffer): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string, key: Buffer): string {
  const [ivHex, encryptedHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// pages/api/store-github-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { generateSalt, deriveKey, encrypt } from '../../utils/encryption';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { token, password } = req.body;
    const salt = generateSalt();
    const key = deriveKey(password, salt);
    const encryptedToken = encrypt(token, key);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        githubToken: encryptedToken,
        tokenSalt: salt
      },
    });

    return res.status(200).json({ message: 'Token stored successfully' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/use-github-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { deriveKey, decrypt } from '../../utils/encryption';
import { Octokit } from '@octokit/rest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { githubToken: true, tokenSalt: true },
    });

    if (!user?.githubToken || !user?.tokenSalt) {
      return res.status(400).json({ error: 'GitHub token not found' });
    }

    const key = deriveKey(password, user.tokenSalt);
    const decryptedToken = decrypt(user.githubToken, key);

    const octokit = new Octokit({ auth: decryptedToken });

    // Use octokit to perform GitHub operations
    // For example:
    // const { data } = await octokit.repos.createForAuthenticatedUser({ name: 'new-repo' });

    res.status(200).json({ message: 'GitHub operation successful' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}