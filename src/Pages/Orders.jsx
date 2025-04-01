import { DinamicTable } from "../Components/DinamicTable"

export const Orders = () => {
    return <DinamicTable 
                    object={{nome: '', telefone: '', email: ''}} 
                    defaultData={[]}
                    crudUrls={{
                      c: 'supplier/addsupplier', 
                      r:'order/getorders', 
                      u: 'supplier/updatesupplier', 
                      d: 'supplier/deletesupplier'}} 
                    allowEdit={true}/>
}