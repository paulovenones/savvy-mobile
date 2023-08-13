import styled from "styled-components/native";
import { verticalScale } from "react-native-size-matters";
import { ScreenTitle } from "../../molecules/ScreenTitle";

export const StyledFormHeaderContainer = styled.View`
  align-items: center;
`;

export const StyledTitle = styled(ScreenTitle)`
  padding-top: ${verticalScale(16)}px;
`;
