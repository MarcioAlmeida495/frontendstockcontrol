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
  width: 100%;
  gap: 5px;
`;

const AbsoluteDiv = styled.div`
  position: absolute;
  height: 35px;
`;

export const Select = ({
  url,
  defaultPlaceholder,
  getSelected = () => {},
  width = undefined,
  showInfo = true,
  register = undefined,
  selectedId = undefined,
  refresh = true,
}) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [title, setTitle] = useState("");
  const refSelect = useRef(null);

  const attData = useCallback(() => {
    dataFetch({ simpleurl: url })
      .then((r) => {
        setData(
          r.sort((a, b) =>
            a.nome.toUpperCase().localeCompare(b.nome.toUpperCase())
          )
        );
        setSelected(r[0]);
      })
      .catch((error) => window.alert(error));
  }, [url]);

  useEffect(() => {
    attData();
  }, [attData]);

  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);

  useEffect(() => {
    console.log(`SELECTED :: ${selected} no USEEFFECT`);
    getSelected(selected);
    setTitle("");
  }, [selected, getSelected]);

  useEffect(() => {
    if (refSelect.current.options[0]) {
      refSelect.current.value = refSelect.current.options[0].value;
      data.map((each) => {
        if (Number(each.id) === Number(refSelect.current.value)) {
          // console.log('encontrado');
          setSelected(each);
          return true;
        } else return null;
      });
      // console.log(refSelect.current.options[0])
    }
  }, [search, data]);

  useEffect(() => {
    // console.log(data);
    if (selectedId) {
      for (var i = 0; i < data.length; i++) {
        if (selectedId === data[i].id) {
          refSelect.current.value = data[i].id;

          i = data.length;
        }
      }
    }
  }, [data, selectedId]);

  return (
    <Div width={`${width ? width : undefined}`}>
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
        <StyledSelect
          title={JSON.stringify(selected)}
          {...register}
          ref={refSelect}
          defaultValue={selectedId}
          onChange={(e) => {
            data.map((each) => {
              if (Number(each.id) === Number(e.target.value)) {
                // console.log('encontrado');
                setSelected(each);
                return true;
              } else return null;
            });
          }}
        >
          {data &&
            data.map((element, index) => {
              try {
                var test = false;
                test = removeAccents(element.nome)
                  .toUpperCase()
                  .includes(removeAccents(search.toUpperCase()));
              } catch (error) {}
              if (test)
                return (
                  <option value={element.id} key={index}>
                    {element.nome}
                  </option>
                );
              else return null;
            })}
        </StyledSelect>
      }

      {refresh && (
        <StyledConfirmButton
          width={"30px"}
          onClick={() => {
            attData();
          }}
        >
          <RefreshIcon />
        </StyledConfirmButton>
      )}
    </Div>
  );
};
