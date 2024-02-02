/**
 * This code defines a React context named ThemeContext,
 * which encapsulates the state related to the application's theme.
 * The context provides a structure (ThemeContextType) for its value,
 * including a boolean flag 'darkTheme' and a function 'setDarkTheme'
 * to update the theme state. The initial values are set with a default
 * dark theme and a dummy function. This context can be used across
 * components to access and update the theme state.
 */

// Import necessary types and the createContext function from React
import { Dispatch, SetStateAction, createContext } from "react";

// Define a TypeScript type for the structure of the ThemeContext value
type ThemeContextType = {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
};

// Create a React context named ThemeContext with initial values
const ThemeContext = createContext<ThemeContextType>({
  darkTheme: true,
  setDarkTheme: () => null
});

// Export the ThemeContext as the default export of this module
export default ThemeContext;
