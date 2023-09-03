import { scale, verticalScale } from "react-native-size-matters";
import styled from "styled-components/native";
import { Animated } from "react-native";
import { typographyStyles } from "../Typography";

interface IStyledInputContainerProps {
  isFocused: boolean;
  hasError?: boolean;
}

interface IStyledInputLabelProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError?: boolean;
}

export const StyledInputContainer = styled.View<IStyledInputContainerProps>`
  border: 1px solid;
  border-color: ${({ isFocused, theme, hasError }) => {
    if (hasError) {
      return theme.colors["warning"];
    }
    if (isFocused) {
      return theme.colors["blue-dark-40"];
    }
    return theme.colors["blue-dark-10"];
  }};
  position: relative;
  min-height: ${verticalScale(64)}px;
  width: ${scale(312)}px;
  border-radius: 16px;
  background-color: ${({ theme, hasError }) =>
    hasError ? theme.colors["warning-light"] : theme.colors.white};
`;

export const StyledInputLabel = styled(Animated.Text)<IStyledInputLabelProps>`
  ${typographyStyles.paragraphThree}
  position: absolute;
  left: ${scale(20)}px;
  color: ${({ theme }) => theme.colors["grey"]};
`;

export const StyledInput = styled.TextInput`
  padding-left: ${scale(20)}px;
  flex: 1;
  ${typographyStyles.paragraphTwo}
`;
