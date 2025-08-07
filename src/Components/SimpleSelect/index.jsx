import { useCallback, useEffect, useRef, useState } from "react";
import { dataFetch, removeAccents } from "../../utils/functions";
import { StyledSelect } from "../../Styles/styledSelect";
import styled from "styled-components";
import { StyledInput } from "../../Styles/styledInput";
import { StyledConfirmButton } from "../../Styles/styledConfirmButton";
import { RefreshIcon } from "../AnimationIcons/Refresh";

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
  width = undefined,
  data,
  register,
  selectedId = undefined,
  registerName,
}) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState();
  const refSelect = useRef(null);
  useEffect(() => {
    setSelected(selectedId);
  }, [selectedId]);

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
        <>
          <AbsoluteDiv>
            <div style={{ position: "absolute", top: "5px", left: "5px" }}>
              <img
                className="lupeimg"
                alt="searchicon"
                title={search}
                onClick={() => {
                  setIsSearching(true);
                }}
                style={{ width: "25px" }}
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
        </>
      )}
      {
        <StyledSelect {...register(registerName)} defaultValue={selectedId}>
          {data &&
            data.map((element, index) => {
              // console.log(element.id);
              return (
                <option value={Number(element.id)} key={index}>
                  {element.nome}
                </option>
              );
            })}
        </StyledSelect>
      }
    </Div>
  );
};
