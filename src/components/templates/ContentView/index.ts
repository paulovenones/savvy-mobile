import styled from "styled-components/native";
import { scale, verticalScale } from "react-native-size-matters";

export const ContentView = styled.View`
  flex: 1;
  align-items: center;
  padding: ${verticalScale(80)}px ${scale(24)}px;
`;
