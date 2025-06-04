export const BASE_URL: string =
  process.env.BASE_URL ?? "http://localhost:8080";
export const VALID_EMAIL: string = process.env.EMAIL ?? "hello@gmail.com";
export const VALID_PASSWORD: string = process.env.PASSWORD ?? "password";
export const INVALID_EMAIL: string = process.env.INVALID_EMAIL ?? "invalid";
export const SIGNUP_URL: string = process.env.SIGNUP_URL ?? "";
export const IMAGE_PATH: string =
  "./images/stars.png";
export const TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 10000,
  LONG: 20000
};