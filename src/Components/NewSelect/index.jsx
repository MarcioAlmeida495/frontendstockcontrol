import React, { useEffect, useId, useState } from "react";
import styles from "./styles.module.css";
import { StyledInput } from "../../Styles/styledInput";
import { dataFetch, removeAccents } from "../../utils/functions";
import { useRef } from "react";
export const NewSelect = ({
  getValues = () => {},
  placeholder,
  setValue,
  register,
  registerName,
  url,
  selected = undefined,
  getSelected = () => {},
}) => {
  const checkId = useId();
  const [selectedOption, setSelectedOption] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState(getValues(registerName));
  const refSearch = useRef(null);
  const [data, setData] = useState([]);
  const dataID = useId();
  useEffect(() => {
    dataFetch({ simpleurl: url }).then((r) =>
      setData(r.sort((a, b) => a.nome.localeCompare(b.nome)))
    );
  }, [url, setData]);
  useEffect(() => {
    refSearch.current?.focus();
    const value = getValues(registerName);
    console.log(value);
  }, []);

  useEffect(() => {
    console.log("valor no registro: ", selectedOption);
  });

  useEffect(() => {
    if (!selectedId || !data.length) return;

    const found = data.find((item) => item.id === selectedId);
    if (found) {
      getSelected(found);
      setSelectedOption(found);
    }
  }, [selected, data, getSelected]);

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
        onChange={(e) => {
          if (e.target.checked) refSearch.current.focus();
        }}
        defaultChecked={false}
        hidden
      />
      <div>
        <StyledInput
          ref={refSearch}
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
              data
                .filter((each) => {
                  const search = removeAccents(
                    searchValue.trim().toUpperCase()
                  );
                  if (!search) return true; // sem filtro, mostra tudo

                  const nome = removeAccents(each.nome.toUpperCase());
                  const searchWords = search.split(" ").filter((w) => w !== "");

                  // Todas as palavras do search devem existir em alguma parte do nome
                  return searchWords.every((word) => nome.includes(word));
                })
                .map((each, index) => (
                  <React.Fragment key={index}>
                    <input
                      name="select"
                      id={`${dataID}optncheckbox${index}`}
                      className={styles.optioncheckbox}
                      type="radio"
                      hidden
                      defaultChecked={
                        selected === each.id || selectedId === each.id
                      }
                      onChange={() => {
                        setSelectedOption(each);
                        setValue(registerName, each.id);
                        getSelected(each);
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
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
