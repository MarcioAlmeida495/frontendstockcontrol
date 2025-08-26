import { useEffect, useState } from "react";
import { NewSelect } from "../Components/NewSelect";
import { dataFetch, formatInit } from "../utils/functions";
import { useForm } from "react-hook-form";
import { StyledInput } from "../Styles/styledInput";
import styled from "styled-components";
import { StyledConfirmButton } from "../Styles/styledConfirmButton";

const urls = {
  getSuppliers: "supplier/getsuppliers",
  getItems: "items/getitems",
};

export const TestSupplierOrder = () => {
  const [selected, setSelected] = useState();
  const { register, setValue, getValues } = useForm();
  const [output, setOutput] = useState();
  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <Div>
      <h1>TESTES</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        {/* BOTÃO PARA TOTAL DE VENDAS DO DIA */}
        <StyledConfirmButton
          onClick={() => {
            setValue(
              "sql",
              `SELECT SUM(valor_total) AS TOTAL, cl.nome 
               FROM comandas 
               JOIN clientes cl ON cl.id = cliente_id 
               WHERE DATE('now', 'localtime') = DATE(data) 
               GROUP BY cl.id;`
            );
            setTimeout(() => {
              document.getElementById("sendsql").click();
            }, 50);
          }}
          title="Total de Venda do dia, separado por conta"
        >
          SumBills
        </StyledConfirmButton>

        {/* BOTÃO PARA ITENS VENDIDOS NA SEMANA */}
        <StyledConfirmButton
          onClick={() => {
            setValue(
              "sql",
              `SELECT i.nome, SUM(com.quantidade) AS totalVendido
               FROM comanda_items com
               JOIN items i ON i.id = com.item_id
               WHERE DATE(com.data) BETWEEN DATE('now', '-6 day', 'localtime') AND DATE('now', 'localtime')
               GROUP BY i.id;`
            );
            setTimeout(() => {
              document.getElementById("sendsql").click();
            }, 50);
          }}
        >
          Items/Week
        </StyledConfirmButton>

        {/* BOTÃO PARA CALCULAR E ATUALIZAR MÉDIA SEMANAL */}
        <StyledConfirmButton
          onClick={() => {
            setValue(
              "sql",
              `UPDATE items
               SET media_semanal = (
                 SELECT IFNULL(SUM(com.quantidade) / 7.0, 0)
                 FROM comanda_items com
                 WHERE com.item_id = items.id
                 AND DATE(com.data) BETWEEN DATE('now', '-6 day', 'localtime') AND DATE('now', 'localtime')
               );`
            );
            setTimeout(() => {
              document.getElementById("sendsql").click();
            }, 50);
          }}
          title="Atualiza a média semanal de todos os itens"
        >
          Calc Média
        </StyledConfirmButton>
      </div>

      <StyledInput type="text" $width={"80%"} {...register("sql")} />

      <button
        id="sendsql"
        onClick={() => {
          console.log(getValues("sql"));
          dataFetch({
            simpleurl: `test/testsql`,
            init: formatInit({ data: { sql: getValues("sql") } }),
          }).then((r) => setOutput(r.result));
        }}
      >
        send sql
      </button>

      {output && (
        <ContentDiv>
          {output.map((each, index) => {
            console.log(each);
            return (
              <EachContent key={index}>
                {each.id && (
                  <button
                    onClick={() => {
                      const sql = getValues("sql");
                      const table = sql.split(" ")[3];
                      const deletesql = `DELETE FROM ${table} WHERE id = ${each.id}`;
                      dataFetch({
                        simpleurl: `test/testsql`,
                        init: formatInit({ data: { sql: deletesql } }),
                      }).then((r) => {
                        console.log(r);
                      });
                    }}
                  >
                    Excluir
                  </button>
                )}
                {Object.keys(each).map((value, index) => {
                  return (
                    <div key={`values${index}`}>
                      {value}: {each[value]}
                    </div>
                  );
                })}
              </EachContent>
            );
          })}
        </ContentDiv>
      )}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 80%;
  padding: 20px;
`;

const EachContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 18px;
  width: 50%;
  padding: 10px;
  box-shadow: 0px 0px 10px black;
`;

const ContentDiv = styled.div`
  height: calc(100vh - 200px);
  padding: 20px;
  align-items: center;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
