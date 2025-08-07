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
    // console.log('RESPONSE-->', response)
    try {
      var inJson = await response.json();
      // console.log(inJson)
      return inJson;
    } catch (error) {
      // console.log('trying to fetch :: ', url);
      // console.log(`response:: ${response}, error:: ${error}`);
      return false;
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return error; // Ou lançar o erro, dependendo do caso
  }
};

export const formatInit = ({ data } = {}) => {
  // console.log('DATA:: ',data)
  return {
    method: "POST", // Ou "POST", "PUT", "DELETE", etc.
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo enviado
      Authorization: "Bearer token_aqui", // Se precisar de autenticação
    },
    body: JSON.stringify({ data: data }), // Apenas para métodos como POST ou PUT
  };
};

export const orderByKey = (array, key) => {
  return array.slice().sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
};

export const removeAccents = (str) => {
  try {
    const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalized;
  } catch (error) {
    return str;
  }
};

export const formatarData = (dataString) => {
  const [data, hora] = dataString.split(" ");
  const [ano, mes, dia] = data.split("-");
  const [horaStr, minuto] = hora.split(":");
  return `${dia}-${mes}-${ano} ${horaStr}:${minuto}`;
};

export const formatDataYYYYMMDD = (dataString) => {
  const [ano, mes, dia] = dataString.split("-");
  return `${dia}-${mes}-${ano}`;
};

export const removeHours = (dataString) => {
  const [date] = dataString.split(" ");
  return date;
};

export const getDate = () => {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0"); // mês começa em 0
  const dia = String(agora.getDate()).padStart(2, "0");

  const dataLocal = `${ano}-${mes}-${dia}`;
  return dataLocal;
};
