/**
 * This code defines a React context provider, ThemeProvider, that encapsulates
 * the logic related to the application's theme. It utilizes the ThemeContext defined
 * in context/themeContext.ts to manage the dark theme state. The provider reads the theme preference
 * from local storage, initializes state with it, and renders the child components
 * within the context of the dark or light theme.
 */

"use client";

import { useEffect, useState } from "react";

// Import the ThemeContext for managing the theme state
import ThemeContext from "@/context/themeContext";

// Define the ThemeProvider component
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Read theme preference from local storage or default to false
  const themeFromStorage: boolean = typeof localStorage !== "undefined" && localStorage.getItem("hotel-theme") ? JSON.parse(localStorage.getItem("hotel-theme")!) : false;

  // Initialize state for dark theme and its setter function
  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);

  // State to control rendering of the component
  const [renderComponent, setRenderComponent] = useState(false);

  // Effect to trigger the rendering of the component once on mount
  useEffect(() => {
    setRenderComponent(true);
  }, []);

  // If the component is not ready to render, return an empty fragment
  if (!renderComponent) return <></>;

  // Render the ThemeProvider with ThemeContext.Provider
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
        <div className="dark:text-white dark:bg-black text-[#1E1E1E]">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
