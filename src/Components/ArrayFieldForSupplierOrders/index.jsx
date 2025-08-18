import { Controller } from "react-hook-form";
import { StyledInput } from "../../Styles/styledInput";
import { Select } from "../Select";
import { StyledCancelButton } from "../../Styles/styledConfirmButton";
import { useEffect, useRef, useState, useCallback } from "react";
import { dataFetch } from "../../utils/functions";
import styled from "./styles.module.css";
import React from "react";

// memoiza o Select para evitar re-render quando as props não mudam
const MemoSelect = React.memo(Select);

export const ItemsArrayField = ({ form, fields, remove, styles }) => {
  const [info, setInfo] = useState(undefined);
  const [selected, setSelected] = useState();

  // mapeia fieldId -> índice atual (atualizado a cada render)
  const indexByFieldIdRef = useRef(new Map());
  // mapeia fieldId -> handler estável (criado uma vez por fieldId)
  const handlerByFieldIdRef = useRef(new Map());

  useEffect(() => {
    if (selected) {
      dataFetch({ simpleurl: `catalog/getcatalogbyitem/${selected}` }).then(
        (r) => {
          setInfo(r);
        }
      );
    }
  }, [selected]);

  // devolve sempre a MESMA função para um dado fieldId
  const getStableHandlerFor = useCallback(
    (fieldId) => {
      const map = handlerByFieldIdRef.current;
      if (!map.has(fieldId)) {
        map.set(fieldId, (sel) => {
          const idx = indexByFieldIdRef.current.get(fieldId);
          if (idx == null) return;
          form.setValue(`items.${idx}.id`, sel.id);
          setSelected(sel.id);
        });
      }
      return map.get(fieldId);
    },
    [form]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        gap: "5px",
        width: "100%",
        padding: "10px",
      }}
    >
      <div className={styled.infodiv}>
        {info &&
          info.data.map((value, index) => (
            <span key={index}>
              {parseFloat(value.valor).toFixed(2)} - {value.fornecedores_nome}
            </span>
          ))}
      </div>

      {fields.map((field, index) => {
        // mantém o vínculo fieldId -> índice atual SEM criar hooks
        indexByFieldIdRef.current.set(field.id, index);

        // handler estável por fieldId (não muda entre renders)
        const handleSelect = getStableHandlerFor(field.id);

        return (
          <div className={styles.row} key={field.id}>
            {/* Quantidade */}
            <Controller
              control={form.control}
              name={`items.${index}.quantidade`}
              render={({ field: fld }) => (
                <StyledInput
                  value={fld.value ?? 1}
                  className={styles.w100}
                  type="number"
                  placeholder="qtd"
                  onChange={(e) => {
                    const valor = form.getValues(`items.${index}.valor`);
                    valor
                      ? (document.getElementById(`items.${index}.total`).value =
                          e.target.value * valor)
                      : form.setValue(
                          `items.${index}.valor`,
                          document.getElementById(`items.${index}.total`) /
                            e.target.value
                        );
                    fld.onChange(e);
                  }}
                />
              )}
            />

            {/* Select do item - NÃO remonta e NÃO recria handler */}
            <MemoSelect
              url={"items/getitems"}
              showInfo={true}
              getSelected={handleSelect}
            />

            {/* Valor */}
            <Controller
              control={form.control}
              name={`items.${index}.valor`}
              render={({ field: fld }) => (
                <StyledInput
                  className={styles.w100}
                  placeholder="Valor"
                  value={fld.value || ""}
                  onChange={(e) => {
                    document.getElementById(`items.${index}.total`).value =
                      e.target.value *
                      form.getValues(`items.${index}.quantidade`);
                    fld.onChange(e);
                  }}
                />
              )}
            />

            {/* Total */}
            <StyledInput
              placeholder="Total"
              id={`items.${index}.total`}
              onChange={(e) => {
                form.setValue(
                  `items.${index}.valor`,
                  e.target.value / form.getValues(`items.${index}.quantidade`)
                );
              }}
            />

            {/* Remover */}
            <StyledCancelButton width={"40px"} onClick={() => remove(index)}>
              x
            </StyledCancelButton>
          </div>
        );
      })}
    </div>
  );
};
