import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
      { path: "skills", loader: () => redirect("/#stack") },
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);
