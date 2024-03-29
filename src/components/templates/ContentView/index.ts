import styled from "styled-components/native";
import { scale, verticalScale } from "react-native-size-matters";

export const ContentView = styled.View`
  flex: 1;
  padding: ${verticalScale(80)}px ${scale(19)}px;
  background-color: ${({ theme }) => theme.colors.white};
`;
