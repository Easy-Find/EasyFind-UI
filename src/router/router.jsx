import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom";
import Insitucional from "../pages/Institucional/Institucional";
import GerenciamentoProdutos from "../pages/GerenciamentoProdutos/GerenciamentoProdutos";

import TelaInicial from "../pages/TelaInicial/TelaInicial";
import TelaPesquisa from "../pages/TelaPesquisa/TelaPesquisa";

import BreadCrumbCadastroCliente from "../componentes/CadastroComerciante/BreadCrumbCadastroCliente";
import CadastroComerciante from "../componentes/CadastroComerciante/CadastroComerciante";
import GerenciamentoLoja from "../pages/GerencimentoLojas/GerenciamentoLoja";
import HistoricoVendas from "../pages/HistoricoVendas/HistoricoVendas";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";

import PedidosComerciante from "../pages/PedidosComerciante/PedidosComerciante";
import PedidosUsuario from "../pages/PedidosUsuario/PedidosUsuario";
import MapaInterativo from "../pages/MapaInterativo/MapaInterativo";
import { isPermited } from "../utils/Autheticated";

const PrivateRoute = ({ element, usuario, ...rest }) => {
  if (!isPermited(usuario)) {
    return <NotFound />;
  }
  return element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Insitucional />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro/comerciante",
    element: <CadastroComerciante />,
  },
  {
    path: "/cadastro/bread",
    element: <BreadCrumbCadastroCliente />,
  },
  {
    path: "/comerciante/produtos",
    element: (
      <PrivateRoute usuario="comerciante" element={<GerenciamentoProdutos />} />
    ),
  },
  {
    path: "/comerciante/lojas",
    element: (
      <PrivateRoute usuario="comerciante" element={<GerenciamentoLoja />} />
    ),
  },
  {
    path: "/comerciante/vendas",
    element: (
      <PrivateRoute usuario="comerciante" element={<HistoricoVendas />} />
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/index",
    element: <TelaInicial />,
  },

  {
    path: "/pesquisa",
    element: <TelaPesquisa />,
  },
  {
    path: "/comerciante/pedidos",
    element: (
      <PrivateRoute usuario="comerciante" element={<PedidosComerciante />} />
    ),
  },
  {
    path: "/usuario/pedidos",
    element: <PrivateRoute usuario="consumidor" element={<PedidosUsuario />} />,
  },
  {
    path: "/mapa",
    element: <MapaInterativo />,
  },
]);

export default router;
