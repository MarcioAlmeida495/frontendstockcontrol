import styled from "styled-components";
export const squareSize = "40px";

export const StyledLeftMenu = styled.div`
  float: left;
  display: flex;
  position: absolute;
  top: 0;
  z-index: 999;
  flex-direction: column;
  width: 35px;
  height: 35px;
  background-color: rgba(0, 0, 0, 0);
  gap: 10px;
  overflow: hidden;
  padding-top: 50px;
  padding-left: 20px;
  transition: width 200ms ease-in-out, height 200ms ease-in-out;

  &.active {
    width: 250px;
    background: linear-gradient(0deg, #ccc, #bbb, #aaa);
    height: 100vh;
    border-right: 2px solid black;
    padding-top: 50px;
    padding-left: 20px;
  }
`;
