import { Configurations } from "./Components/Configurations";
import { ItensControl } from "./Components/ItensControl";
import { LeftMenu } from "./Components/LeftMenu";
import { ListItens } from "./Components/ListItens";
import { StyledBody } from "./Styles/styledBody";
import { StyledContentBody } from "./Styles/styledContentBody";
import { StyledLeftMenu } from "./Styles/styledLeftMenu";
import { StyledTopMenu } from "./Styles/styledTopMenu";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <StyledBody>
      <BrowserRouter>
          {/* <StyledTopMenu>
            <Link to='/' onClick={()=>{

            }} >Home</Link>
            <Link to='/teste'>teste</Link>
          </StyledTopMenu> */}
          <LeftMenu>
            
          </LeftMenu>
          <StyledContentBody>
            <Routes>
              <Route path="/" element={<h1>HELLO</h1>}/>
              <Route path="/itens" element={<ItensControl />}/>
              <Route path="/getitens" element={<ListItens />}/>
              <Route path="/conf" element={<Configurations />}/>
              
            </Routes>
          </StyledContentBody>
      </BrowserRouter>
    </StyledBody>
  );
}

export default App;
