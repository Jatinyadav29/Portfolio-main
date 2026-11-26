import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "projects", loader: () => redirect("/#projects") },
      { path: "projects/:slug", Component: ProjectDetail },
      { path: "skills", loader: () => redirect("/#stack") },
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);
