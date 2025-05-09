import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { DashboardLayout } from "./";
import { type Navigation } from "./Navigation";
import { NavigationContext } from "./LayoutContext";
import { Link as ReactRouterLink, Outlet } from "react-router";

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
    segment: "services",
    title: "Services",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "pricing",
    title: "Pricing",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Tutorial",
  },
  {
    segment: "tutorial",
    title: "Tutorial",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "intro",
        title: "Intro",
        icon: <DescriptionIcon />,
        action: <ReactRouterLink to={"intro"} />,
      },
      {
        segment: "windows",
        title: "Windows",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
  {
    kind: "divider",
  },
  { segment: "abc", title: "ABC", icon: <BarChartIcon></BarChartIcon> },
  { segment: "abc", title: "ABC", icon: <BarChartIcon></BarChartIcon> },
  { segment: "abc", title: "ABC", icon: <BarChartIcon></BarChartIcon> },
  { segment: "abc", title: "ABC", icon: <BarChartIcon></BarChartIcon> },
  { segment: "abc", title: "ABC", icon: <BarChartIcon></BarChartIcon> },
  { segment: "abc", title: "ABC", icon: <BarChartIcon></BarChartIcon> },
];

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  return (
    <NavigationContext.Provider value={NAVIGATION}>
      <DashboardLayout navigation={NAVIGATION}>
        <Outlet></Outlet>
      </DashboardLayout>
    </NavigationContext.Provider>
  );
}
