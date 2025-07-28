import { useForm } from "react-hook-form";
import { NewSelect } from "../NewSelect";
import styles from "./styles.module.css";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { useState } from "react";

export const NewTab = () => {
  const { register, setValue } = useForm();
  return (
    <div>
      <NewSelect
        registerName={"client"}
        url={"clients/getclients"}
        register={register}
        setValue={setValue}
      />
    </div>
  );
};

export const OpenTabs = () => {
  const [tabs, setTabs] = useState(new Map());
  const [tabIdCounter, setTabIdCounter] = useState(1);
  const [tabStyle, setTabStyle] = useState(styles.openTabs1);

  const addTab = () => {
    const newTabs = new Map(tabs); // copiar o Map atual
    newTabs.set(tabIdCounter, {
      title: `Aba ${tabIdCounter}`,
      content: "...",
    });
    setTabs(newTabs);
    setTabIdCounter(tabIdCounter + 1);
  };

  return (
    <>
      <label>
        <input
          name="type"
          type="radio"
          onClick={() => {
            setTabStyle(styles.openTabs1);
          }}
        />
        Type1
      </label>
      <label>
        <input
          name="type"
          type="radio"
          onClick={() => {
            setTabStyle(styles.openTabs2);
          }}
        />
        Type2
      </label>
      <label>
        <input
          name="type"
          type="radio"
          onClick={() => {
            setTabStyle(styles.openTabs3);
          }}
        />
        Type3
      </label>
      <div className={tabStyle}>
        <button className={styles.eachtab1} onClick={addTab}>
          +
        </button>

        {[...tabs.entries()].map(([key, tab]) => (
          <div key={key} className={styles.eachtab1}>
            <strong>{tab.title}</strong>
            <div>{tab.content}</div>
            <button
              onClick={() => {
                console.log(key);
                // const newMap = tabs.delete(key);
                console.log(tabs);
                // console.log(newMap);

                setTabs((prev) => {
                  const newMap = new Map(prev);
                  newMap.delete(key);
                  return newMap;
                });
              }}
            >
              close
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
