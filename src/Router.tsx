import { createBrowserRouter, type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <h1>hello world</h1>,
  },
];

export const router = createBrowserRouter(routes);
