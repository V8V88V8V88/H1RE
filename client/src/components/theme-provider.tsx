import { createContext, useContext, useEffect, useState } from "react";
import { Theme, ThemeProviderProps } from "@/types";

type ResolvedTheme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => null,
});

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    media().matches ? "dark" : "light"
  );

  // Follow OS theme changes live
  useEffect(() => {
    const mq = media();
    const onChange = () => setSystemTheme(mq.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = (next: Theme) => {
    // Picking the same theme as the OS goes back to following the OS
    if (next === systemTheme) {
      localStorage.removeItem(storageKey);
      setThemeState("system");
    } else {
      localStorage.setItem(storageKey, next);
      setThemeState(next);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
