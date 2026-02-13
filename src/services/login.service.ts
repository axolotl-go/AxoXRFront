import { fetcher } from "./api";

interface Data {
  [key: string]: string | number | boolean;
}

export const SignUp = (data: Data) => {
  return fetcher("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const SignIn = (data: Data) => {
  return fetcher("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const IsLogin = (): Promise<Response> => {
  return fetcher("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const SignOut = () => {
  return fetcher("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
