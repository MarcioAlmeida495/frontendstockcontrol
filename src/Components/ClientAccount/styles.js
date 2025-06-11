import styled from "styled-components";

export const Head = styled.span`
  width: ${({ $width }) => $width || "auto"};
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

export const RowDiv = styled.div`
  display: flex;
  padding: 3px;
  gap: 2px;
`;

export const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`;
