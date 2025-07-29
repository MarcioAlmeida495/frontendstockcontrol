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
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [checkedDate, setCheckedDate] = useState(false);
  const [monthSelect, setMonthSelect] = useState(new Date().getMonth() + 1);
  const [yearSelect, setYearSelect] = useState(new Date().getFullYear());
  useEffect(() => {
    setData(null);
    dataFetch({
      simpleurl: `supplierorders/getordersbymonthyear/${monthSelect}/${new Date().getFullYear()}`,
    }).then((r) => {
      setData(r);
    });
  }, [setData, monthSelect]);

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
                  <td>
                    Data{" "}
                    <select
                      name="monthselect"
                      onChange={(e) => {
                        setMonthSelect(e.target.value);
                      }}
                      value={monthSelect}
                    >
                      {console.log(new Date().getMonth())}
                      <option value={1}>Janeiro</option>
                      <option value={2}>Fevereiro</option>
                      <option value={3}>Março</option>
                      <option value={4}>Abril</option>
                      <option value={5}>Maio</option>
                      <option value={6}>Junho</option>
                      <option value={7}>Julho</option>
                      <option value={8}>Agosto</option>
                      <option value={9}>Setembro</option>
                      <option value={10}>Outubro</option>
                      <option value={11}>Novembro</option>
                      <option value={12}>Dezembro</option>
                    </select>
                    <select name="yearselect">{}</select>
                    <input
                      name="date"
                      type="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                    <input
                      name="checkdate"
                      type="checkbox"
                      onChange={(e) => {
                        setCheckedDate(e.target.checked);
                      }}
                      defaultChecked={false}
                    />
                  </td>
                  <td>
                    Status:{" "}
                    <select
                      name="typeselect"
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
                  if (checkedDate) {
                    console.log(String(each.data_pedido).split(" ")[0]);
                    if (String(each.data_pedido).split(" ")[0] === date) {
                      isReturning = true;
                    } else isReturning = false;
                  }
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
