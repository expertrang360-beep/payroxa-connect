import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import type { CmsUser, AdminRole } from "./types";

const CMS_SECRET =
  process.env.CMS_JWT_SECRET ||
  process.env.SESSION_SECRET ||
  "payroxa-cms-production-secure-signature-key-2026";

const TOKEN_EXPIRY_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createSignedToken(user: CmsUser): string {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    issuedAt: Date.now(),
    expiresAt: Date.now() + TOKEN_EXPIRY_MS,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", CMS_SECRET).update(payloadB64).digest("base64url");

  return `${payloadB64}.${signature}`;
}

export function verifySignedToken(token: string | undefined | null):
  | { valid: false }
  | {
      valid: true;
      user: { id: string; email: string; name: string; role: AdminRole };
      expiresAt: number;
    } {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", CMS_SECRET)
    .update(payloadB64)
    .digest("base64url");

  try {
    const isSigMatch = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));

    if (!isSigMatch) {
      return { valid: false };
    }

    const payloadStr = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadStr);

    if (Date.now() > payload.expiresAt) {
      return { valid: false };
    }

    return {
      valid: true,
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
        role: payload.role as AdminRole,
      },
      expiresAt: payload.expiresAt,
    };
  } catch {
    return { valid: false };
  }
}
