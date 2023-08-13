import styled from "styled-components/native";

interface IMarginProps {
  margin?: string;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
}

export const Margin = styled.View<IMarginProps>`
  ${({ margin }) => (margin ? `margin: ${margin};` : "")}
  ${({ mt }) => (mt ? `margin-top: ${mt}px;` : "")}
  ${({ mr }) => (mr ? `margin-right: ${mr}px;` : "")}
  ${({ mb }) => (mb ? `margin-bottom: ${mb}px;` : "")}
  ${({ ml }) => (ml ? `margin-left: ${ml}px;` : "")}
`;
