import { scale, verticalScale } from "react-native-size-matters";
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
  ${({ mt }) => (mt ? `margin-top: ${verticalScale(mt)}px;` : "")}
  ${({ mr }) => (mr ? `margin-right: ${scale(mr)}px;` : "")}
  ${({ mb }) => (mb ? `margin-bottom: ${verticalScale(mb)}px;` : "")}
  ${({ ml }) => (ml ? `margin-left: ${scale(ml)}px;` : "")}
`;
