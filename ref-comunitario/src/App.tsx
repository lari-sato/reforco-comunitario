import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Header } from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Inner />
    </BrowserRouter>
  );
}

function Inner() {
  const { pathname } = useLocation();
  const hideHeader = pathname === "/" || pathname === "/register" || pathname === "/login";

  return (
    <>
      {/* se header estiver oculto (home/login/register) mostramos apenas a topbar */}
      {hideHeader ? <div className="home__topbar" /> : <Header />}

      {/* Conteúdo principal (sempre renderizado) */}
      <main className="main">
        <AppRoutes />
      </main>

      {/* Rodapé (sempre renderizado) */}
      <div className="footer">© 2025 - Reforço Comunitário</div>
    </>
  );
}
