import { useEffect, useRef, useState } from "react";
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
  const [reset, setReset] = useState(0);
  const [data, setData] = useState();
  const [modalData, setModalData] = useState(null);
  const [status, setStatus] = useState("Todos");
  useEffect(() => {
    dataFetch({ simpleurl: "supplierorders/getallorders" }).then((r) => {
      setData(r);
    });
  }, [setData]);

  useEffect(() => {
    console.log(reset);
  }, [reset]);
  return (
    <Provider value={{ reset: reset, setReset: setReset }}>
      <Div width={"700px"}>
        {modalData && (
          <Modal onClose={() => setModalData(null)} children={modalData} />
        )}
        {data && (
          <div className={styles["table-container"]}>
            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Forn.Nome</td>
                  <td>Data</td>
                  <td>
                    Status:{" "}
                    <select
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option>Todos</option>
                      <option>Pendente</option>
                      <option>Entregue</option>
                      <option>Cancelado</option>
                    </select>
                  </td>
                  <td>Funções</td>
                </tr>
              </thead>
              <tbody>
                {data.map((each, index) => {
                  var isReturning = false;
                  if (status === "Todos") {
                    isReturning = true;
                  } else if (each.status === status) isReturning = true;

                  return isReturning ? (
                    <TrowOrder
                      key={index}
                      setModalData={setModalData}
                      each={each}
                    />
                  ) : null;
                })}
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
    </Provider>
  );
};
