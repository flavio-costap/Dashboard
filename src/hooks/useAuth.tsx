"use client";
import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type User = { email: string };
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === "admin@admin.com" && password === "admin123") {
      const loggedUser = { email };
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("authToken", "fake-token");
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } else {
      toast.error("Credenciais inválidas");
    }
  };

  const logout = () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("global-filters");
    router.push("/login");

    setTimeout(() => setIsLoggingOut(false), 1000);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
