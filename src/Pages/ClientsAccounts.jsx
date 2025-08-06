import { useEffect, useState } from "react";
import styles from "../Styles/clientsAccountsStyles.module.css";
import "../utils/functions";
import { dataFetch } from "../utils/functions";
import { ClientAccount } from "../Components/ClientAccount";
import { StyledInput } from "../Styles/styledInput";
import { OpenTabs } from "../Components/ClientAccount/OpenTabs";
export const ClientsAccounts = () => {
  const [clients, setClients] = useState([]);
  const [openClient, setOpenClient] = useState(false);
  const [search, setSearch] = useState("");
  const [openTabs, setOpenTabs] = useState(true);
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
  return (
    <>
      <div className={styles.accounts}>
        <div className={styles.leftMenu}>
          <div
            className={styles.tabButton}
            onClick={() => {
              setOpenClient(false);
            }}
          >
            Comandas
          </div>
          <StyledInput
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Buscar"
          />
          {clients &&
            clients.map((client, index) => {
              console.log(client);
              if (client.nome.toUpperCase().includes(search.toUpperCase()))
                return (
                  <div
                    className={styles.clientButton}
                    onClick={() => {
                      setOpenClient(client);
                      setSearch("");
                    }}
                    key={index}
                  >
                    {client.nome}
                  </div>
                );
              else return null;
            })}
        </div>
        <div>{openClient && <ClientAccount client={openClient} />}</div>
        {!openClient && <OpenTabs />}
      </div>
    </>
  );
};
