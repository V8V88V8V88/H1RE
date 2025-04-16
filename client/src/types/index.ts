import { ReactNode } from "react";

// Theme provider types
export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

// For theme context
export type Theme = "dark" | "light" | "system";
