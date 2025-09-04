import { useForm } from "react-hook-form";
import { NewSelect } from "../NewSelect";
import styles from "./styles.module.css";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { useEffect, useState } from "react";
import { StyledInput } from "../../Styles/styledInput";

export const TabContent = ({ tabId }) => {
  const form = useForm();

  return <StyledInput {...form.register(`name${tabId}`)} />;
};

export const NewTab = () => {
  const [clientName, setClientName] = useState("");

  const [isRegistredClient, setIsRegistredClient] = useState(false);
  const { register, setValue, getValues } = useForm();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
      }}
    >
      <StyledConfirmButton
        width={"200px"}
        onClick={() => {
          setIsRegistredClient(!isRegistredClient);
        }}
      >{`${
        isRegistredClient ? "Cliente já cadastrado" : "Cliente não cadastrado"
      }`}</StyledConfirmButton>
      {isRegistredClient ? (
        <NewSelect
          getValues={getValues}
          registerName={"client"}
          url={"clients/getclients"}
          register={register}
          setValue={setValue}
        />
      ) : (
        <StyledInput register={"nome"} />
      )}
    </div>
  );
};

export const OpenTabs = () => {
  const [tabs, setTabs] = useState(new Map());
  const [tabIdCounter, setTabIdCounter] = useState(1);
  const [tabStyle, setTabStyle] = useState(styles.openTabs1);

  useEffect(() => {}, []);

  const addTab = () => {
    const newTabs = new Map(tabs); // copiar o Map atual
    newTabs.set(tabIdCounter, {
      title: `Aba ${tabIdCounter}`,
      content: <NewTab />,
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
