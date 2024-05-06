import { useThemeMode } from "@/contexts/ThemeContextProvider";
import React from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import cn from "classnames";

const ToggleTheme: React.FC = () => {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <div className="flex items-center">
      {/* <span className="mr-2">Light ☀️</span> */}
      <label
        htmlFor="theme-toggle"
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="theme-toggle"
          className="sr-only"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <div className="w-14 h-8 rounded-full shadow-inner border-4 border-darkgrey dark:border-cream opacity-40 dark:opacity-100 dark:border-primary"></div>
        <div
          className={cn(
            "transform transition-all ease-in-out duration-300 absolute left-1 bottom-2 w-4 h-4 opacity-100 text-darkgrey dark:text-cream rounded-full shadow",
            theme === "dark" ? "translate-x-7" : "translate-x-1"
          )}
        >
          {theme == "light" ? (
            <MdDarkMode className="w-4 h-4" />
          ) : (
            <MdLightMode className="w-4 h-4" />
          )}
        </div>
      </label>
      {/* <span className="ml-2">🌙 Dark</span> */}
    </div>
  );
};

export default ToggleTheme;
