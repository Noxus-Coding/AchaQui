import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { DashboardPage } from "../features/home/pages/DashboardPage";
import { ProfissionaisPage } from "../features/profissionais/page/ProfissionaisPage";
import { ProfissionalDetalhesPage } from "../features/profissionais/page/ProfissionalDetalhesPage";
import { CadastroProfissionalPage } from "../features/profissionais/page/CadastroProfissionalPage";
import { MeuPerfilPage } from "../features/perfil/pages/MeuPerfilPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profissionais",
    element: <ProfissionaisPage />,
  },
  {
    path: "/profissionais/:id",
    element: <ProfissionalDetalhesPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path:"/cadastro-profissional",
        element: <CadastroProfissionalPage/>,
      },
      {
        path: "/meu-perfil",
        element: <MeuPerfilPage/>
      },
    ],
  },
]);