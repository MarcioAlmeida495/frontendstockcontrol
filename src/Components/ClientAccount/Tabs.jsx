import {
  useEffect,
  useRef,
  useState,
  useContext,
  useId,
  useCallback,
  createContext,
} from "react";
import styles from "./styles.module.css";
import {
  dataFetch,
  formatarData,
  formatInit,
  getDate,
  removeHours,
} from "../../utils/functions";
import { Context } from "../Context";
import { simpleSum, sumArr, sumPayments } from "./Payment";
import {
  StyledCancelButton,
  StyledConfirmButton,
} from "../../Styles/styledConfirmButton";
import { Tab } from "./Tab";

export const ScrollContext = createContext();
export const ScrollProvider = ({ children, functions }) => {
  return (
    <ScrollContext.Provider value={functions}>
      {children}
    </ScrollContext.Provider>
  );
};
export const useScollContext = () => useContext(ScrollContext);

export const Tabs = ({ tabs }) => {
  const refOverflowed = useRef(null);
  const openCheckId = useId();
  const closedCheckId = useId();
  const [openTabs, setOpenTabs] = useState(true);
  const [closedTabs, setClosedTabs] = useState(false);
  const functions = useContext(Context);
  const [date, setDate] = useState(
    functions.client.id === 9999 ? getDate() : null
  );
  const functionsRef = useRef(useContext(Context));
  const refDate = useRef();
  const refCheckDate = useRef();

  useEffect(() => {
    var status = null;
    if (openTabs && closedTabs) status = null;
    else if (openTabs) status = "aberta";
    else status = "fechada";

    functions.setFilter((f) => {
      return { ...f, status: status };
    });
  }, [openTabs, closedTabs]);

  useEffect(() => {
    let newArray = [];
    if (openTabs && tabs) {
      const filteredOpen = tabs.filter(
        (tab) =>
          tab.status === "aberta" && (!date || date === removeHours(tab.data))
      );
      if (filteredOpen.length > 0) newArray = filteredOpen;
    }
    if (closedTabs && tabs) {
      const filteredClosed = tabs.filter(
        (tab) =>
          tab.status === "fechada" && (!date || date === removeHours(tab.data))
      );
      if (filteredClosed.length > 0)
        newArray = [...newArray, ...filteredClosed];
    }
    functionsRef.current.setCheckedTabs(newArray);
  }, [closedTabs, openTabs, tabs, date]);

  useEffect(() => {
    // console.log(functions.checkedTabs);
  }, [functions.checkedTabs]);

  const renderTabs = useCallback(() => {
    if (!tabs) return null;
    console.log(tabs);

    // Criar um Map agrupando por data (somente ano-mês-dia)
    const tabsMap = new Map();

    tabs.forEach((tab) => {
      // filtrar abertas/fechadas + data
      if (
        (openTabs && tab.status === "aberta") ||
        (closedTabs && tab.status === "fechada")
      ) {
        if (!date || date === removeHours(tab.data)) {
          const dia = tab.data.split(" ")[0];
          if (!tabsMap.has(dia)) {
            tabsMap.set(dia, []);
          }
          tabsMap.get(dia).push(tab);
        }
      }
    });

    // ordenar as datas (mais recentes primeiro, por exemplo)
    const orderedEntries = Array.from(tabsMap.entries()).sort(
      ([d1], [d2]) => new Date(d2) - new Date(d1)
    );

    return orderedEntries.map(([dia, tabsDoDia]) => (
      <div className={`${styles.oneday}`} key={dia}>
        <label htmlFor={dia}>
          <h4>{dia}</h4>
        </label>

        <input type="checkbox" id={dia} className={styles.showday} hidden />
        <div className={styles.onedayContent}>
          {tabsDoDia
            .sort((a, b) => b.id - a.id)
            .map((tab, i) => (
              <Tab key={i} tab={tab} />
            ))}
        </div>
      </div>
    ));
  }, [tabs, openTabs, closedTabs, date]);

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "40px",
          alignItems: "center",
          gap: "3px",
        }}
      >
        <input
          type="checkbox"
          className={styles.checked}
          id={openCheckId}
          value={openTabs}
          defaultChecked
          onChange={(e) => {
            if (openTabs && !closedTabs) {
              setClosedTabs(true);
            }
            document.getElementById(closedCheckId).checked = true;
            setOpenTabs(e.target.checked);
          }}
          hidden
        />
        <label className={styles.checkLabel} htmlFor={openCheckId}>
          Abertas
        </label>

        <input
          type="checkbox"
          className={styles.checked}
          id={closedCheckId}
          value={closedTabs}
          onChange={(e) => {
            if (closedTabs && !openTabs) {
              setOpenTabs(true);
            }
            document.getElementById(openCheckId).checked = true;
            setClosedTabs(e.target.checked);
          }}
          hidden
        />
        <label className={styles.checkLabel} htmlFor={closedCheckId}>
          Fechadas
        </label>
        <input
          type="date"
          defaultValue={getDate()}
          onChange={(e) => {
            setDate(e.target.value);
            functions.setFilter({ ...functions.filter, date: e.target.value });
            refCheckDate.current.checked = true;
          }}
          ref={refDate}
        />
        <input
          type="checkbox"
          ref={refCheckDate}
          defaultChecked={functions.client.id === 9999}
          className={styles.checkbox}
          onChange={(e) => {
            if (e.target.checked) {
              setDate(refDate.current.value);
              // functions.setFilter({ ...functions.filter, date: date });
            } else {
              setDate(null);
              functions.setFilter({ ...functions.filter, date: null });
            }
          }}
        />
        <StyledConfirmButton width="150px" height="20px">
          {`${
            functions.checkedTabs?.length === tabs?.length
              ? "Desmarcar Todas"
              : "Marcar Todas"
          }`}
        </StyledConfirmButton>
      </div>
      <div ref={refOverflowed} className={styles.overflowed}>
        {renderTabs()}
      </div>
      <h3>Total: R$ {simpleSum(functions.checkedTabs)}</h3>
      <h3>Total Pago: R$ {sumPayments(functions.checkedTabs)}</h3>
    </>
  );
};
