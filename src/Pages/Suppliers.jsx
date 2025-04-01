import { DinamicTable } from "../Components/DinamicTable"

export const Suppliers = () => {
    return <DinamicTable 
                    object={{nome: '', telefone: '', email: ''}} 
                    defaultData={[]}
                    crudUrls={{
                      c: 'supplier/addsupplier', 
                      r:'supplier/getsuppliers', 
                      u: 'supplier/updatesupplier', 
                      d: 'supplier/deletesupplier'}} 
                    allowEdit={true}/>

}