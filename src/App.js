import styled from "styled-components";
// import "./Styles/global.css";
import "./Styles/globalstyles.css";
import styles from "./Styles/global.module.css";
import { Configurations } from "./Components/Configurations";
import { DinamicTable } from "./Components/DinamicTable";
import { DinamicForm } from "./Components/Forms/DinamicForm";
import { ItensControl } from "./Components/ItensControl";
import { LeftMenu } from "./Components/LeftMenu";
import { ListClients } from "./Components/ListClients";
import { ListItens } from "./Components/ListItens";
import { StyledBody } from "./Styles/styledBody";
import { StyledContentBody } from "./Styles/styledContentBody";
import { StyledLeftMenu } from "./Styles/styledLeftMenu";
import { StyledLink } from "./Styles/styledLink";
import { StyledTopMenu } from "./Styles/styledTopMenu";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { Iframe } from "./Components/Iframe";
import { Clients } from "./Pages/clients";
import { Suppliers } from "./Pages/Suppliers";
import { Orders } from "./Pages/Orders";
import { Items } from "./Pages/Items";
import { CatalogSuppliers } from "./Pages/catalogsupplier";
import { NewSupplierOrder } from "./Pages/NewSupplierOrder";
import { SupplierOrders } from "./Pages/SupplierOrders";
import { Links } from "./Components/Link/LeftMenuLink";
import { ClientsAccounts } from "./Pages/ClientsAccounts";

function App() {
  return (
    <StyledBody>
      <BrowserRouter>
        <LeftMenu>
          <Links
            links={{
              CONFIGURAÇÕES: "/conf",
              CLIENTES: "/getclients",
              CONTAS: "/accounts",
              ITEMS: "/getitens",
              FORNECEDORES: "/getsuppliers",
              COMPRAS: "/getorders",
              "NOVO PEDIDO": "/newsupplierorder",
              PEDIDOS: "/supplierorders",
              CATÁLOGOS: "/catalogs",
              "SISTEMA ANTIGO": "/",
            }}
          />
          {/* <StyledLink to={'/conf'}>
                    <h3>CONFIGURAÇÕES</h3>
                </StyledLink>
          <StyledLink to={'/getclients'}>
                <h3>CLIENTES</h3>
            </StyledLink>
            <StyledLink to={'/getitens'}>
                <h3>ITEMS</h3>
            </StyledLink>
            <StyledLink to={'/getsuppliers'}>
                <h3>FORNECEDORES</h3>
            </StyledLink>
            <StyledLink to={'/getorders'}>
                <h3>COMPRAS</h3>
            </StyledLink>
            <StyledLink to={'/newsupplierorder'}>
                <h3>NOVO PEDIDO</h3>
            </StyledLink>
            <StyledLink to={'/supplierorders'}>
                <h3>PEDIDOS</h3>
            </StyledLink>
            <StyledLink to={'/catalogs'}>
                <h3>CATALOGS</h3>
            </StyledLink>
            <StyledLink to={'/'}>
                <h3>SISTEMA ANTIGO</h3>
            </StyledLink> */}
        </LeftMenu>
        <StyledContentBody>
          <Routes>
            <Route path="/" element={<Iframe show={true} />} />
            <Route path="/getitens" element={<Items />} />
            <Route path="/conf" element={<Configurations />} />
            <Route path="/getclients" element={<Clients />} />
            <Route path="/getsuppliers" element={<Suppliers />} />
            <Route path="/getorders" element={<Orders />} />
            <Route path="/supplierorders" element={<SupplierOrders />} />
            <Route path="/newsupplierorder" element={<NewSupplierOrder />} />
            <Route path="/catalogs" element={<CatalogSuppliers />} />
            <Route path="/accounts" element={<ClientsAccounts />} />
          </Routes>
        </StyledContentBody>
      </BrowserRouter>
    </StyledBody>
  );
}

export default App;
