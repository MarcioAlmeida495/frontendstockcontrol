import { useEffect, useState } from "react"
import { dataFetch } from "../../utils/functions";

import styled, { keyframes } from 'styled-components';

// Definindo a animação do gradiente
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Estilizando o componente com a animação
const StyledDivTab = styled.div`
  position: relative;
  height: 350px;
  background: linear-gradient(to right, rgba(255,255,255,1), rgba(200,200,200,0.8));
  background-size: 400% 400%;
  border: 1px solid #999;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.5s ease, transform 200ms ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    animation: ${gradientAnimation} 10s ease infinite;
  }
`;


export const ClientTab = ({tab}) => {
    const [data, setData] = useState();

    useEffect(()=>{
        dataFetch({simpleurl: ''})
    },[tab])

    return <StyledDivTab></StyledDivTab>
}