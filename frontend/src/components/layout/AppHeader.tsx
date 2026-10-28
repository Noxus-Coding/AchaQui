import { useAuth } from "../../features/auth/hooks/useAuth";
import { Header } from "../../features/landing/components/Header";
import { AuthenticatedHeader } from "../../features/home/components/AuthenticatedHeader";

export function AppHeader() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AuthenticatedHeader /> : <Header />;
}