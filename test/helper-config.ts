export const BASE_URL: string =
  process.env.BASE_URL ?? "http://localhost:8080/";
export const VALID_EMAIL: string = process.env.EMAIL ?? "hello@gmail.com";
export const VALID_PASSWORD: string = process.env.PASSWORD ?? "password";
export const INVALID_EMAIL: string = process.env.INVALID_EMAIL ?? "invalid";
export const LOGIN_URL: string =
  process.env.LOGIN_URL ?? "http://localhost:8080/account/login";
export const SIGNUP_URL: string = process.env.SIGNUP_URL ?? " ";
export const AUTHOR_IMAGE_URL: string = process.env.AUTHOR_IMAGE_URL ?? " ";
export const DEFAULT_AUTHOR_IMAGE: string =
  process.env.DEFAULT_AUTHOR_IMAGE ?? " ";
export const IMAGE_PATH = process.env.IMAGE_PATH ?? " ";
