import { useState } from "react"
import { DinamicTable } from "../Components/DinamicTable"
import { Div } from "../Styles/styledDiv"
import { Modal } from "../Components/Modal";

export const SupplierOrders = () => {
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState('');


    return <Div width={'700px'}>
        <Modal show={show} onClose={()=>setShow(false)} children={info}/>
        <DinamicTable 
            defaultData={[]}
            crudUrls={{
            r:'supplierorders/getallorders'
            }}
            allowEdit={false}
            onClickInaRow={(row)=>{setShow(true); console.log(row.id); setInfo(<DinamicTable crudUrls={{r: `supplierorders//getorderbyid/${row.id}`}} defaultData={[]}/>)}}
            />
    </Div> 
    
}