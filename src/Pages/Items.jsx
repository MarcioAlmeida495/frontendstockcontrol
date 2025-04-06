import { DinamicTable } from "../Components/DinamicTable"
import { Div } from "../Styles/styledDiv"

export const Items = () => {
    return <Div width={'700px'}>
    <DinamicTable 
    
    object={{nome: '', quantidade: '', preco: ''}} 
    defaultData={[]}
    crudUrls={{
      c: 'items/createiten', 
      r:'items/getitems', 
      u: 'items/updateitem', 
      d: 'items/deleteitem'}} 
      allowEdit={true}
      />
      </Div> 
}