import { DinamicTable } from "../Components/DinamicTable"

export const Clients = () => {
    return <DinamicTable 
        object={{nome: '', telefone: '', email: ''}} 
        defaultData={[]}
        crudUrls={{
            c: 'clients/addclient', 
            r:'clients/getclients', 
            u: 'clients/updateclient', 
            d: 'clients/deleteclient'}} 
        allowEdit={true}
    />
}