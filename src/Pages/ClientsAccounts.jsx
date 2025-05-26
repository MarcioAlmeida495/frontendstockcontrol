import { useEffect, useState } from "react";
import styles from "../Styles/clientsAccountsStyles.module.css";
import "../utils/functions";
import { dataFetch } from "../utils/functions";
import { ClientAccount } from "../Components/ClientAccount";
export const ClientsAccounts = () => {
  const [clients, setClients] = useState([]);
  const [openClient, setOpenClient] = useState(false);

  useEffect(() => {
    dataFetch({ simpleurl: "clients/getclients" }).then((r) => {
      setClients(r);
    });
  }, []);
  return (
    <>
      <div className={styles.accounts}>
        <h1>Contas</h1>
        <div className={styles.leftMenu}>
          {clients &&
            clients.map((client, index) => {
              return (
                <div
                  className={styles.clientButton}
                  onClick={() => {
                    setOpenClient(client);
                  }}
                  key={index}
                >
                  {client.nome}
                </div>
              );
            })}
        </div>
        <div>
          <ClientAccount client={openClient} />
        </div>
      </div>
    </>
  );
};
