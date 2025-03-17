import { backendURL } from "./getURLs";


export const dataFetch = async ({ simpleurl, init } = {}) => {
  const url = `${backendURL}${simpleurl}`;
  if (!url) {
      throw new Error("URL é obrigatória!");
  }

  try {
      const response = await fetch(url, init); // `init` pode ser passado opcionalmente

      if (!response.ok) {
          return new Error(`Erro HTTP! Status: ${response.status}`);
      }
      console.log('RESPONSE-->', response)
      try {
        var inJson = await response.json();
        return inJson;
      } catch (error) {
        console.log('trying to fetch :: ', url);
        console.log(`response:: ${response}, error:: ${error}`);
        console.log(response);
        return false;
      }
  } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return error; // Ou lançar o erro, dependendo do caso
  }
};


export const formatInit = ({data} = {}) => {
  console.log('DATA:: ',data)
    return {
        method: "POST", // Ou "POST", "PUT", "DELETE", etc.
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo enviado
          "Authorization": "Bearer token_aqui" // Se precisar de autenticação
        },
        body: JSON.stringify({data:data}), // Apenas para métodos como POST ou PUT
      }
}