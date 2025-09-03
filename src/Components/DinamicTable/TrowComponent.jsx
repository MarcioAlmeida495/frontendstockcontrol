import { useEffect, useState } from "react";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
import { TRow } from "./styles";
import { dataFetch, formatInit } from "../../utils/functions";
import { DinamicForm } from "../Forms/DinamicForm";
import { DinamicFormReturnData } from "../Forms/DinamicFormRerturnData";
import { Modal } from "../Modal";

export const TrowComponent = ({
  row = {},
  rowNames = [],
  allowEdit = false,
  onSubmit = () => {},
  crudUrls = {},
  width = "100%",
  reset = () => {},
  onClickInaRow = () => {},
}) => {
  const [editing, setEditing] = useState();
  const [info, setInfo] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    const novoObj = { ...row };
    try {
      if ("preco" in novoObj) {
        // console.log('aqui!?!?!?');
        novoObj.preco = parseFloat(novoObj.preco.toFixed(2));
      }

      if ("valor" in novoObj) {
        novoObj.valor = parseFloat(novoObj.valor.toFixed(2));
      }

      // console.log('novoobj',novoObj)
    } catch (error) {}

    setData(novoObj);
  }, [row]);

  return (
    <>
      {data && (
        <TRow
          onClick={() => {
            onClickInaRow(data);
          }}
        >
          <Modal
            show={show}
            width={"100px"}
            onClose={() => {
              setShow(false);
            }}
            children={info}
          />
          {editing ? (
            <DinamicFormReturnData
              margin={"0px"}
              width="100%"
              onSubmit={(values) => {
                console.log(values);
                dataFetch({
                  simpleurl: crudUrls.u,
                  init: formatInit({ data: values }),
                }).then((r) => {
                  if (r) reset();
                });
              }}
              onCancel={() => {
                setEditing(false);
              }}
              object={row}
            />
          ) : (
            Object.values(data).map((each, index) => {
              var classname = "";
              if (typeof each === "string") classname = "col-string";
              else if (typeof each === "number") {
                classname = "col-number";
              }
              var value = `${
                typeof each === "string"
                  ? each
                  : Number.parseFloat(each).toFixed(2)
              }`;
              if (
                (Object.keys(data)[index] === "id") |
                (Object.keys(data)[index] === "quantidade")
              ) {
                value = parseInt(String(each).replaceAll(",", "."));
              }
              return (
                <div
                  className={classname}
                  onClick={() => {
                    setShow(!show);
                    setInfo(each);
                  }}
                  title={each}
                  style={{ position: "relative" }}
                  key={index}
                >
                  {value}
                </div>
              );
            })
          )}
          {allowEdit && (
            <>
              {!editing ? (
                <div className="col-functions">
                  <StyledConfirmButton
                    onClick={() => {
                      setEditing(true);
                    }}
                  >
                    Editar
                  </StyledConfirmButton>
                  <StyledCancelButton
                    onClick={() => {
                      console.log("executando func : excluir ");
                      console.log(`url: ${crudUrls.d}, data: ${data}`);
                      dataFetch({
                        simpleurl: crudUrls.d,
                        init: formatInit({ data: data }),
                      }).then((r) => reset());
                    }}
                  >
                    Excluir
                  </StyledCancelButton>
                </div>
              ) : (
                <>
                  {/* <StyledConfirmButton onClick={()=>{setEditing(true)}}>Confirmar</StyledConfirmButton>
                    <StyledCancelButton onClick={()=>{setEditing(false)}}>Cancelar</StyledCancelButton> */}
                </>
              )}
            </>
          )}
        </TRow>
      )}
    </>
  );
};
