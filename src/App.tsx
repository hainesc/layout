import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
// import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DashboardLayout } from "./layout";
import { type Navigation } from "./layout/Navigation";
import { Navigate, NavigationContext } from "./layout/LayoutContext";

import {
  useSearchParams,
  useLocation,
  useNavigate,
  Link as ReactRouterLink,
  Outlet,
} from "react-router";
// import { useDemoRouter } from "@toolpad/core/internal";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "reports/sales",
        title: "Sales",

        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "reports1",
    title: "Reports",
    icon: <BarChartIcon />,
    virtual: true,
    children: [
      {
        segment: "reports1/sales",
        title: "Sales",

        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;

  // Remove this const when copying and pasting into your project.
  // const demoWindow = window !== undefined ? window() : undefined;
  console.log("should only once...");
  console.log(new Date());
  return (
    <NavigationContext.Provider value={NAVIGATION}>
      <DashboardLayout navigation={NAVIGATION}>
        <Outlet></Outlet>
      </DashboardLayout>
    </NavigationContext.Provider>
  );
}
