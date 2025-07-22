import { useEffect, useState } from "react";
import { Div } from "../../Styles/styledDiv";
import { Modal } from "../../Components/Modal";
import { dataFetch } from "../../utils/functions";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
import styles from "./styles.module.css";
import { Provider } from "./OrderContext";
import { TrowOrder } from "./TrowOrder";

export const SupplierOrders = () => {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    dataFetch({ simpleurl: "supplierorders/getallorders" }).then((r) => {
      setData(r);
    });
  }, [setData]);
  return (
    <Div width={"700px"}>
      <Modal show={show} onClose={() => setShow(false)} children={info} />
      {data && (
        <div className={styles["table-container"]}>
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Forn.Nome</td>
                <td>Data</td>
                <td>Status</td>
                <td>Funções</td>
              </tr>
            </thead>
            <tbody>
              {data.map((each, index) => (
                <TrowOrder each={each} key={index} />
                // <tr key={index}>
                //   <td>{each.id}</td>
                //   <td>{each.nome_fornecedor}</td>
                //   <td>{each.data_pedido}</td>
                //   <td>{each.status}</td>
                //   <td className={styles.functions}>
                //     <StyledConfirmButton>Ver</StyledConfirmButton>
                //     <StyledConfirmButton>Editar</StyledConfirmButton>
                //   </td>
                // </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* <DinamicTable 
            defaultData={[]}
            crudUrls={{
            r:'supplierorders/getallorders'
            }}
            allowEdit={false}
            // onClickInaRow={(row)=>{setShow(true); console.log(row.id); setInfo(<DinamicTable crudUrls={{r: `supplierorders/getorderbyid/${row.id}`}} defaultData={[]}/>)}}
            onClickInaRow={(row)=>{setShow(true); console.log('row -- > ',row); setInfo(<SupplierOrder supplierOrder={row} url={`supplierorders/getorderbyid/${row.id}`} />)}}
            /> */}
    </Div>
  );
};
