export const COOKIE_NAME = "rba_session";

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export function setAuthCookie(res, token, rememberMe = true) {
  const options = { ...authCookieOptions };

  if (rememberMe) {
    options.maxAge = COOKIE_MAX_AGE;
  }

  res.cookie(COOKIE_NAME, token, options);
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, authCookieOptions);
}
