import styled from "styled-components";
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



function App() {

  return (
    <StyledBody>
      <BrowserRouter>
          <LeftMenu>
          <StyledLink to={'/getclients'}>
                <h3>CLIENTES</h3>
            </StyledLink>
            <StyledLink to={'/getitens'}>
                <h3>ITEMS</h3>
            </StyledLink>
            <StyledLink to={'/getsuppliers'}>
                <h3>FORNECEDORES</h3>
            </StyledLink>
            <StyledLink to={'/'}>
                <h3>SISTEMA ANTIGO</h3>
            </StyledLink>
          </LeftMenu>
          <StyledContentBody>
            <Routes>
              <Route path="/" element={<Iframe show={true}/>}/>
              <Route path="/itens" element={<ItensControl />}/>
              {/* <Route path="/getitens" element={<ListItens />}/> */}
              <Route path="/getitens" element={<DinamicTable 
                object={{nome: '', quantidade: '', preco: ''}} 
                crudUrls={{
                  c: 'items/createiten', 
                  r:'items/getitems', 
                  u: 'items/updateitem', 
                  d: 'items/deleteitem'}} 
                allowEdit={true}
              />} />
              {/* <Route path="/getclients" element={<ListClients />}/> */}
              <Route path="/conf" element={<Configurations />}/>
              <Route path="/getclients" element={<DinamicTable 
                object={{nome: '', telefone: '', email: ''}} 
                crudUrls={{
                  c: 'clients/addclient', 
                  r:'clients/getclients', 
                  u: 'clients/updateclient', 
                  d: 'clients/deleteclient'}} 
                allowEdit={true}/>
              }/>
              <Route path="/getsuppliers" element={<DinamicTable 
                object={{nome: '', telefone: '', email: ''}} 
                crudUrls={{
                  c: 'supplier/addsupplier', 
                  r:'supplier/getsuppliers', 
                  u: 'supplier/updatesupplier', 
                  d: 'supplier/deletesupplier'}} 
                allowEdit={true}/>
              }/>
            </Routes>
          </StyledContentBody>
      </BrowserRouter>
    </StyledBody>
  );
}

export default App;
