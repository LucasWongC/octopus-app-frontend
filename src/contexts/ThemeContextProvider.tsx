"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import cn from "classnames";

type ThemeProviderProps = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const ThemeContext = createContext({} as ThemeProviderProps);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = useCallback(() => {
    if (theme == "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const prevTheme = window?.localStorage?.getItem("theme");
    if (prevTheme) {
      setTheme(prevTheme as "light" | "dark");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <html lang="tr" className={theme}>
        <body className={cn("scroll-smooth font-cerco")}>{children}</body>
      </html>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Should bound hook with provider");
  }

  return context;
};
