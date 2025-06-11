import styled from "styled-components";
import { DinamicForm } from "../Forms/DinamicForm";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
import { TrowComponent } from "./TrowComponent";
import { DinamicFormReturnData } from "../Forms/DinamicFormRerturnData";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { onNavigate, onSuccess } from "../../handles/handles";
import { StyledInput } from "../../Styles/styledInput";
import styles from "../../Pages/styles.module.css";

const { useEffect, useState } = require("react");
const {
  dataFetch,
  formatInit,
  orderByKey,
  removeAccents,
} = require("../../utils/functions");
const { Head, HeadColumn, TBody, Table } = require("./styles");
const Div = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
`;
const DivLabel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  height: 35px;
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: #4590d6;
  color: rgba(0, 0, 0, 0);
  overflow: hidden;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: -7px;
  left: -7px;
  transition: height 200ms linear, width 200ms linear,
    background-color 400ms linear, color 200ms linear;
  border: 1px solid rgba(0, 0, 0, 0);

  & > span {
    font-size: 13px;
  }

  & ::before {
    color: black;
    position: absolute;
    top: -3px;
    left: 6px;
    content: "";
  }
  &:hover {
    color: black;
    width: 200px;
    height: 200px;
    background-color: white;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    cursor: pointer;

    & ::before {
      content: "";
    }
  }
`;

export const DinamicTable = ({
  rowNames = [],
  object = {},
  crudUrls = {},
  allowEdit = false,
  defaultData = [],
  onClickInaRow = () => {},
}) => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const [key, setKey] = useState(0);
  const [orderBy, setOrderBy] = useState("id");
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (crudUrls.r)
      dataFetch({ simpleurl: crudUrls.r }).then((r) => {
        setData(r);
      });
    else setData(defaultData);
  }, [key, crudUrls, defaultData]);

  useEffect(() => {
    setData((d) => orderByKey(d, orderBy));
  }, [orderBy]);

  // useEffect(()=>{
  //     setData(defaultData);
  // }, [defaultData])

  // useEffect(()=>{console.log(data)},[data])
  // useEffect(()=>{setcounter(c => c+1); console.log(counter)})

  return (
    <Div key={key}>
      {(!crudUrls.c || !data) && (
        <InfoDiv>
          {!crudUrls.c && <span>url para 'create' não encontrada</span>}
          {!crudUrls.r && <span>url para 'read' não encontrada</span>}
          {!crudUrls.u && <span>url para 'update' não encontrada</span>}
          {!crudUrls.d && <span>url para 'delete' não encontrada</span>}
          {!data && <span>NENHUM DADO</span>}
        </InfoDiv>
      )}
      {crudUrls.c && (
        <DinamicFormReturnData
          upName={(value) => {
            setSearch(value);
          }}
          $margin={"10px"}
          width={"100%"}
          height={"30px"}
          onSubmit={(values) => {
            dataFetch({
              simpleurl: crudUrls.c,
              init: formatInit({ data: values }),
            }).then((r) => {
              window.alert(r);
              setKey(key + 1);
            });
          }}
          object={object}
        />
      )}
      {data && (
        <DivLabel className={styles.row}>
          <StyledInput
            id="search-id"
            value={search}
            onChange={(e) => {
              setSearch(removeAccents(e.target.value));
            }}
            placeholder="PESQUISE"
            $width={"100%"}
          />
          <StyledConfirmButton
            onClick={() => {
              document.getElementById("search-id").focus();
            }}
          >
            Pesquisar
          </StyledConfirmButton>
        </DivLabel>
      )}
      {data && (
        <Table>
          {data.length > 0 && (
            <>
              <Head>
                {Object.keys(data[0]).map((key, index) => {
                  return (
                    <HeadColumn
                      className={`${
                        typeof data[0][key] === "string"
                          ? "col-string"
                          : "col-number"
                      }`}
                      onClick={() => {
                        setOrderBy(key);
                      }}
                      key={index}
                    >
                      {key.toUpperCase()}
                    </HeadColumn>
                  );
                })}
                {allowEdit && (
                  <HeadColumn className="col-functions">FUNÇÕES</HeadColumn>
                )}
              </Head>
              <TBody key={location.key}>
                {data.map((each, index) => {
                  const values = Object.values(each);
                  var component = null;
                  for (var i = 0; i < values.length; i++) {
                    try {
                      if (
                        removeAccents(values[i])
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      )
                        component = (
                          <TrowComponent
                            onClickInaRow={onClickInaRow}
                            row={each}
                            width={"80%"}
                            key={index}
                            reset={() => setKey(key + 1)}
                            allowEdit={allowEdit}
                            crudUrls={crudUrls}
                          />
                        );
                    } catch (error) {}
                  }
                  return component;
                })}
              </TBody>
            </>
          )}
        </Table>
      )}
    </Div>
  );
};
