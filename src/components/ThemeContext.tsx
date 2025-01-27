import {createContext, type PropsWithChildren, useContext, useState} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | undefined>(undefined);

function ThemeProvider({children, defaultTheme}: PropsWithChildren<{
  defaultTheme?: Theme
}>) {
  const userTheme = localStorage.getItem("theme") as Theme | null;
  const [theme, setTheme] = useState<Theme>(userTheme || defaultTheme || "light");

  console.log('theme', theme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    console.log('toggleTheme', theme);
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export {ThemeProvider, useTheme};