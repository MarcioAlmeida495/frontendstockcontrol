import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DinamicTable } from "../Components/DinamicTable";
import { Div } from "../Styles/styledDiv";
import { dataFetch } from "../utils/functions";
import styles from "../Styles/global.module.css";
import { StyledInput } from "../Styles/styledInput";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../Styles/styledConfirmButton";
import { removeAccents } from "../utils/functions";
export const Context = createContext();

export const Provider = ({ children, value }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useThisContext = () => {
  return useContext(Context);
};

export const Items1 = () => {
  return (
    <Div width={"80%"}>
      <DinamicTable
        object={{ nome: "", quantidade: "", preco: "" }}
        defaultData={[]}
        crudUrls={{
          c: "items/createiten",
          r: "items/getitems",
          u: "items/updateitem",
          d: "items/deleteitem",
        }}
        allowEdit={true}
      />
    </Div>
  );
};
const crudUrls = {
  c: "items/createiten",
  r: "items/getitems",
  u: "items/updateitem",
  d: "items/deleteitem",
};
export const Items2 = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dataFetch({ simpleurl: crudUrls.r }).then((r) => setItems(r));
  }, []);

  return (
    <Provider value={{ items: items, setItems: setItems }}>
      <div className={`${styles.column} ${styles.tam80} ${styles.fadin}`}>
        <div className={`${styles.divblock}`}>adicionar</div>
        <div className={`${styles.divblock}`}>
          <StyledInput
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            $width={"100%"}
          />
        </div>
        <br />
        {items && (
          <div className={`${styles.centralized} ${styles.tableh500}`}>
            <table className={`${styles.table100w100h}`}>
              <thead>
                <tr>
                  <Td field={"id"}>id</Td>
                  <Td field={"nome"}>item</Td>
                  <Td field={"quantidade"}>qtd</Td>
                  <Td field={"preco"}>valor</Td>
                  <td>funções</td>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  if (
                    removeAccents(item.nome.toUpperCase()).includes(
                      removeAccents(search.toUpperCase())
                    )
                  )
                    return <Trow item={item} key={index} />;
                  else return null;
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Provider>
  );
};
const Td = ({ children, onClick, field }) => {
  const [show, setShow] = useState(false);
  const { items, setItems } = useThisContext();
  const [clicked, setClicked] = useState(false);
  const [checked, setChecked] = useState(false);
  const refRadio = useRef();

  useEffect(() => {
    if (!refRadio.current?.checked) setClicked(false);
  }, [refRadio.current?.checked]);

  return (
    <td
      className={styles.tdchecked}
      onClick={() => {
        refRadio.current.checked = true;
        setChecked(refRadio.current.checked);
        setClicked(!clicked);
        const sortedItens =
          typeof items[0][field] === "number"
            ? [...items].sort((a, b) => {
                if (!clicked) return a[field] - b[field];
                else return b[field] - a[field];
              })
            : [...items].sort((a, b) => {
                if (!clicked)
                  return a[field]
                    .toUpperCase()
                    .localeCompare(b[field].toUpperCase());
                else
                  return b[field]
                    .toUpperCase()
                    .localeCompare(a[field].toUpperCase());
              });
        console.log(sortedItens);
        setItems(sortedItens);
      }}
      style={{
        transition: "background-color 0.3s ease", // opcional, suave
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <input ref={refRadio} type="radio" name="sortRadio" hidden />
      {children}
      {refRadio.current?.checked && (
        <span style={{ marginLeft: "5px", position: "absolute" }}>
          {clicked ? "▼" : "▲"}
        </span>
      )}
    </td>
  );
};

const Trow = ({ item }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.nome}</td>
      <td>{item.quantidade}</td>
      <td>{parseFloat(String(item.preco).replace(",", ".")).toFixed(2)}</td>
      <td>
        <div className={styles.flex}>
          <StyledConfirmButton onClick={() => {}}>Editar</StyledConfirmButton>
          <StyledCancelButton>Excluir</StyledCancelButton>
        </div>
      </td>
    </tr>
  );
};

export const Items = () => {
  const [changed, setChanged] = useState(false);

  return (
    <>
      <label style={{ position: "absolute", top: "25px", left: "55px" }}>
        <input
          type="checkbox"
          onChange={(e) => {
            setChanged(e.target.checked);
          }}
          name="changed"
        />
        Change
      </label>
      {changed ? <Items1 /> : <Items2 />}
    </>
  );
};
