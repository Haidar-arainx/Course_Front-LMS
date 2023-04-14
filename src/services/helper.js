import Cookie from "cookie-cutter";

export function set_cookie(cookieName, cookieValue) {
  if (Cookie.set(cookieName, cookieValue, { path: "/" })) {
    return true;
  } else {
    return false;
  }
}

export function get_cookie(cookieName) {
  if (Cookie.get(cookieName, { path: "/" })) {
    return Cookie.get(cookieName, { path: "/" });
  } else {
    return false;
  }
}
