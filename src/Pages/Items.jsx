import { DinamicTable } from "../Components/DinamicTable"

export const Items = () => {
    return <DinamicTable 
                    object={{nome: '', quantidade: '', preco: ''}} 
                    defaultData={[]}
                    crudUrls={{
                      c: 'items/createiten', 
                      r:'items/getitems', 
                      u: 'items/updateitem', 
                      d: 'items/deleteitem'}} 
                    allowEdit={true}
                  />
}