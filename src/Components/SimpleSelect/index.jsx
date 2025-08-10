import { useEffect, useRef, useState } from "react";
import { StyledSelect } from "../../Styles/styledSelect";
import styled from "styled-components";
import { StyledInput } from "../../Styles/styledInput";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 100%;
  max-height: 30px;
  width: ${({ $width }) => $width || "100%"};
  gap: 5px;
`;

const AbsoluteDiv = styled.div`
  position: absolute;
  height: 35px;
`;

export const SimpleSelect = ({
  defaultPlaceholder,
  width,
  data,
  register,
  setValue, // <-- vem do RHForm
  selectedId,
  registerName,
}) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const refSelect = useRef(null);

  // sempre que mudar selectedId vindo de fora
  useEffect(() => {
    if (selectedId !== undefined) {
      setValue(registerName, selectedId); // atualiza no RHForm
    }
  }, [selectedId, registerName, setValue]);

  // quando digitar algo, já coloca o primeiro achado no select
  useEffect(() => {
    if (search && data?.length) {
      const firstMatch = data.find((el) =>
        el.nome.toUpperCase().includes(search.toUpperCase())
      );
      if (firstMatch) {
        setValue(registerName, firstMatch.id); // RHForm
      }
    }
  }, [search, data, registerName, setValue]);

  return (
    <Div $width={width}>
      {isSearching ? (
        <>
          <StyledInput
            autoFocus
            onBlur={() => {
              setIsSearching(false);
            }}
            defaultValue={search}
            placeholder={`PESQUISE O ${defaultPlaceholder}`}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            width={"300px"}
            type="search"
          />
          <StyledConfirmButton
            margin={"2px"}
            height={"99%"}
            width={"65px"}
            onClick={() => {
              setIsSearching(false);
            }}
          >
            OK
          </StyledConfirmButton>
        </>
      ) : (
        <AbsoluteDiv>
          <div style={{ position: "absolute", top: "5px", left: "5px" }}>
            <img
              className="lupeimg"
              alt="searchicon"
              title={search}
              onClick={() => {
                setIsSearching(true);
              }}
              style={{ width: "25px", cursor: "pointer" }}
              src="icons/loupe.png"
            />
            {search && (
              <div
                style={{
                  display: "block",
                  position: "absolute",
                  top: "0px",
                  right: "-5px",
                  width: "3px",
                  height: "3px",
                  border: "4px solid red",
                  borderRadius: "5px",
                }}
              />
            )}
          </div>
        </AbsoluteDiv>
      )}
      <StyledSelect ref={refSelect} {...register(registerName)}>
        {data &&
          data.map((element, index) => {
            if (element.nome.toUpperCase().includes(search.toUpperCase())) {
              return (
                <option value={Number(element.id)} key={index}>
                  {element.nome}
                </option>
              );
            }
            return null;
          })}
      </StyledSelect>
    </Div>
  );
};
