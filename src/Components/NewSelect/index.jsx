import React, { useEffect, useId, useState } from "react";
import styles from "./styles.module.css";
import { StyledInput } from "../../Styles/styledInput";
import { dataFetch } from "../../utils/functions";
export const NewSelect = ({
  placeholder,
  setValue,
  register,
  registerName,
  url,
  getSelected = () => {},
}) => {
  const checkId = useId();
  const [selectedOption, setSelectedOption] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const dataID = useId();
  useEffect(() => {
    dataFetch({ simpleurl: url }).then((r) =>
      setData(r.sort((a, b) => a.nome.localeCompare(b.nome)))
    );
  }, [url, setData]);

  useEffect(() => {
    selectedOption && setValue(registerName, selectedOption.id);
    selectedOption && getSelected(selectedOption);
  }, [selectedOption, setValue, registerName, getSelected]);

  return (
    <div className={styles.selectbody}>
      <div className={styles.selected}>
        <label htmlFor={checkId}>
          {selectedOption ? selectedOption.nome : "Selecione"}
        </label>
      </div>
      <input
        id={checkId}
        type="checkbox"
        className={styles.showoptionscheckbox}
        hidden
      />
      <div>
        <StyledInput
          type="search"
          placeholder="Digite para filtrar"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <div className={styles.scrollbox}>
          <div className={styles.options}>
            <input {...register(registerName)} hidden />
            {data &&
              data.map((each, index) => {
                if (each.nome.toUpperCase().includes(searchValue.toUpperCase()))
                  return (
                    <React.Fragment key={index}>
                      <input
                        name="select"
                        id={`${dataID}optncheckbox${index}`}
                        className={styles.optioncheckbox}
                        type="radio"
                        hidden
                        onChange={(e) => {
                          console.log(each);
                          console.log(e.target);
                          setSelectedOption(each);
                          setTimeout(() => {
                            document.getElementById(checkId).checked = false;
                          }, 300);
                        }}
                      />
                      <label
                        className={styles.option}
                        htmlFor={`${dataID}optncheckbox${index}`}
                      >
                        {each.nome}
                      </label>
                    </React.Fragment>
                  );
                else return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
