import { DinamicTable } from "../Components/DinamicTable"
import { Div } from "../Styles/styledDiv"

export const Clients = () => {
    return <Div width={'700px'}>

    <DinamicTable 
        object={{nome: '', telefone: '', email: ''}} 
        defaultData={[]}
        crudUrls={{
            c: 'clients/addclient', 
            r:'clients/getclients', 
            u: 'clients/updateclient', 
            d: 'clients/deleteclient'}} 
            allowEdit={true}
            />
            </Div>
}