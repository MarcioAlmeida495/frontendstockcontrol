import { useEffect, useState } from "react";
import { NewSelect } from "../Components/NewSelect";
import { dataFetch, formatInit } from "../utils/functions";
import { useForm } from "react-hook-form";
import { StyledInput } from "../Styles/styledInput";
import styled from "styled-components";

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
      <StyledInput type="text" $width={"80%"} {...register("sql")} />
      <button
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
      {/* <NewSelect
        url={urls.getItems}
        registerName={"item_ID"}
        register={register}
        setValue={setValue}
        getSelected={(e) => setSelected(e)}
      ></NewSelect> */}
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
