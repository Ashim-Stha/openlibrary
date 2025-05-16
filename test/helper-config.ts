export const BASE_URL: string =
  process.env.BASE_URL ?? "http://localhost:8080";
export const VALID_EMAIL: string = process.env.EMAIL ?? "hello@gmail.com";
export const VALID_PASSWORD: string = process.env.PASSWORD ?? "password";
export const INVALID_EMAIL: string = process.env.INVALID_EMAIL ?? "invalid";
export const LOGIN_URL: string = process.env.LOGIN_URL ?? `${BASE_URL}/account/login`;
export const SIGNUP_URL: string = process.env.SIGNUP_URL ?? " ";
export const MY_BOOKS_BEFORE_LOGIN_URL: string = process.env.MY_BOOKS_BEFORE_LOGIN_URL ?? `${LOGIN_URL}?redirect=%2Faccount%2Fbooks`;
export const MY_BOOKS_URL: string  = process.env.MY_BOOKS_URL ?? `${BASE_URL}/people/openlibrary/books`;
