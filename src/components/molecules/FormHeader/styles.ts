import styled from "styled-components/native";
import { verticalScale } from "react-native-size-matters";
import { ScreenTitle } from "../../molecules/ScreenTitle";

export const StyledFormHeaderContainer = styled.View`
  margin-top: ${verticalScale(76)}px;
  flex: 1;
  align-items: center;
`;

export const StyledTitle = styled(ScreenTitle)`
  padding-top: ${verticalScale(16)}px;
`;
