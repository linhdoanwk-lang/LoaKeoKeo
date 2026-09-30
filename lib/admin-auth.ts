import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "atv_admin_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not configured");
  return value;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyAdminCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  return Boolean(expectedEmail && expectedPassword) && safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase()) && safeEqual(password, expectedPassword);
}

export async function createAdminSession(email: string) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = `${Buffer.from(email).toString("base64url")}.${expires}`;
  (await cookies()).set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_SECONDS,
    path: "/",
  });
}

export async function getAdminSession() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return null;
  const [encodedEmail, expires, signature] = value.split(".");
  if (!encodedEmail || !expires || !signature) return null;
  const payload = `${encodedEmail}.${expires}`;
  if (!safeEqual(signature, sign(payload)) || Number(expires) < Date.now() / 1000) return null;
  return { email: Buffer.from(encodedEmail, "base64url").toString("utf8") };
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
