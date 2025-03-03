import { backendURL } from "./getURLs";


export const dataFetch = async ({ simpleurl, init } = {}) => {
  const url = `${backendURL}${simpleurl}`
  console.log(init)
  if (!url) {
      throw new Error("URL é obrigatória!");
  }

  try {
      const response = await fetch(url, init); // `init` pode ser passado opcionalmente
      console.log("response:: ", response);

      if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const inJson = await response.json();
      console.log("INJSON:: ", inJson);
      return inJson;
  } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return null; // Ou lançar o erro, dependendo do caso
  }
};


export const formatInit = ({data} = {}) => {
    return {
        method: "POST", // Ou "POST", "PUT", "DELETE", etc.
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo enviado
          "Authorization": "Bearer token_aqui" // Se precisar de autenticação
        },
        body: JSON.stringify({data:data}), // Apenas para métodos como POST ou PUT
      }
}