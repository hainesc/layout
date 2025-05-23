import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import DashboardLayoutBasic from "./App";

import DashboardPage from "./pages";
import OrdersPage from "./pages/orders";

const router = createBrowserRouter([
  {
    Component: DashboardLayoutBasic,
    children: [
      {
        path: "/",
        // Component: App,
        children: [
          {
            path: "",
            Component: DashboardPage,
          },
          {
            path: "dashboard",
            Component: DashboardPage,
          },
          {
            path: "orders",
            Component: OrdersPage,
          },
          {
            path: "reports",
            Component: OrdersPage,
          },
          {
            path: "reports/sales",
            Component: OrdersPage,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
