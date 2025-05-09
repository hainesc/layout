"use client";
import * as React from "react";
import { Branding, Navigation } from "./Navigation";
import { DashboardSidebarPageItemContextProps } from "./DashboardSidebarPageItem";

export const DashboardSidebarPageItemContext =
  React.createContext<DashboardSidebarPageItemContextProps | null>(null);

export const NavigationContext = React.createContext<Navigation>([]);

export const BrandingContext = React.createContext<Branding | null>(null);

export const WindowContext = React.createContext<Window | undefined>(undefined);

export function useApplicationTitle() {
  const branding = React.useContext(BrandingContext);
  return branding?.title ?? "Branding";
}

export interface NavigateOptions {
  history?: "auto" | "push" | "replace";
}

export interface Navigate {
  (url: string | URL, options?: NavigateOptions): void;
}
