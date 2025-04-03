import { DinamicTable } from "../Components/DinamicTable"
import { Div } from "../Styles/styledDiv"

export const SupplierOrders = () => {
    return <Div width={'700px'}>
        <DinamicTable 
            defaultData={[]}
            crudUrls={{
            r:'supplierorders/getallorders'
            }}
            allowEdit={false}/>
    </Div> 
    
}