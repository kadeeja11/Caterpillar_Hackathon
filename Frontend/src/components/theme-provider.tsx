import { useEffect, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferred = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    document.documentElement.classList.add(preferred);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 bg-muted px-3 py-1 rounded text-sm shadow hover:bg-muted/80 transition"
      >
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
      {children}
    </div>
  );
}
