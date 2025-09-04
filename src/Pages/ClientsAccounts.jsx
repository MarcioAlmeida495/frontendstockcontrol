import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../Styles/clientsAccountsStyles.module.css";
import { dataFetch } from "../utils/functions";
import { ClientAccount } from "../Components/ClientAccount";
import { StyledInput } from "../Styles/styledInput";
import { OpenTabs } from "../Components/ClientAccount/OpenTabs";
import { LoadIcon } from "../Components/AnimationIcons/LoadIcon/LoadIcon";

const timeout = 300;

export const ClientsAccounts = () => {
  const [clients, setClients] = useState([]);
  const [openClient, setOpenClient] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // delay inicial de loading
  useEffect(() => {
    if (loading) {
      const t = setTimeout(() => setLoading(false), timeout);
      return () => clearTimeout(t);
    }
  }, [loading]);

  // refetch quando abre um cliente
  useEffect(() => {
    setLoading(true);
  }, [openClient]);

  // fetch dos clientes
  useEffect(() => {
    dataFetch({ simpleurl: "clients/getclients" }).then((r) => {
      const clientavulso = r.find((item) => item.id === 9999);
      setClients([
        clientavulso,
        ...r
          .filter((client) => client.id !== 9999)
          .sort((a, b) =>
            a.nome.toUpperCase().localeCompare(b.nome.toUpperCase())
          ),
      ]);
    });
  }, []);

  // memoriza os componentes para não rerenderizar ao digitar na pesquisa
  const memoClientAccount = useMemo(() => {
    if (!openClient) return null;
    return <ClientAccount client={openClient} />;
  }, [openClient]);

  const memoOpenTabs = useMemo(() => {
    if (openClient) return null;
    return <OpenTabs />;
  }, [openClient]);

  const handleClientClick = useCallback((client) => {
    setOpenClient(client);
    setSearch("");
  }, []);

  // filtra clientes apenas no render, não afeta os componentes memoizados
  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.nome.toUpperCase().includes(search.toUpperCase())
    );
  }, [clients, search]);

  return (
    <div className={styles.accounts}>
      <div className={styles.leftMenu}>
        <div className={styles.tabButton} onClick={() => setOpenClient(null)}>
          Comandas
        </div>
        <StyledInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar"
        />
        {filteredClients.map((client) => (
          <div
            className={styles.clientButton}
            onClick={() => handleClientClick(client)}
            key={client.id}
          >
            {client.nome}
          </div>
        ))}
      </div>
      <div>{loading ? <LoadIcon /> : memoClientAccount}</div>
      <div>{loading ? <LoadIcon /> : memoOpenTabs}</div>
    </div>
  );
};
