import { useEffect, useId, useRef, useState } from "react";
import { dataFetch } from "../../utils/functions";
import styles from "./styles.module.css";

export function SelectItem({ onSelect, width = "100%", index = 0, value }) {
  const [items, setItems] = useState([]); // Todos os itens do banco
  const [filteredItems, setFilteredItems] = useState([]); // Itens filtrados
  const [searchVisible, setSearchVisible] = useState(false); // Mostrar campo de pesquisa?
  const [search, setSearch] = useState(""); // Texto digitado no filtro
  const checkId = useId();
  const refSearch = useRef(null);

  // Buscar itens no banco quando o componente monta
  useEffect(() => {
    dataFetch({ simpleurl: "items/getitems" }) // Ajuste a URL para sua API
      .then((res) => {
        setItems(res);
        setFilteredItems(res);
      });
  }, []);

  // Atualiza a lista filtrada sempre que a pesquisa muda
  useEffect(() => {
    if (!search) {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.nome.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, items]);

  useEffect(() => {
    if (searchVisible) {
      refSearch?.current?.focus();
    }
  }, [searchVisible]);

  useEffect(() => {
    console.log(`Resetando o select${index}`);
  });

  return (
    <div style={{ marginBottom: "16px", width: width, position: "relative" }}>
      {/* Botão ou checkbox para mostrar/esconder pesquisa */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          position: "relative",
        }}
        htmlFor={checkId}
      >
        <img
          src="icons/loupe.png"
          alt="lupe"
          style={{
            width: "25px",
            position: "absolute",
            top: "3px",
            left: "3px",
            zIndex: 101,
          }}
        />
      </label>

      {/* Campo de pesquisa (condicional) */}
      <input
        hidden
        className={styles.chekdid}
        id={checkId}
        type="checkbox"
        checked={searchVisible}
        onChange={(e) => {
          setSearchVisible(e.target.checked);
        }}
      />
      <div>
        {searchVisible && (
          <input
            type="text"
            ref={refSearch}
            placeholder="Pesquisar Produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "6px",
              width: width,
              textAlign: "center",
            }}
          />
        )}

        {/* Select de itens */}
        <select
          value={value || ""}
          style={{ width: width, padding: "3px", height: "30px" }}
          onChange={(e) => {
            setSearchVisible(false);
            const selected = filteredItems.find(
              (item) => item.id === parseInt(e.target.value)
            );
            if (selected) onSelect(selected); // envia objeto completo para o pai
          }}
        >
          <option value={""} style={{ textAlign: "center" }}>
            Selecione o Produto...
          </option>
          {filteredItems.map((item) => (
            <option
              key={item.id}
              value={item.id}
              style={{ textAlign: "center" }}
            >
              {item.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
