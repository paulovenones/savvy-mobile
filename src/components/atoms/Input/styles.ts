import { scale, verticalScale } from "react-native-size-matters";
import styled from "styled-components/native";
import { Animated } from "react-native";
import { typographyStyles } from "../Typography";

interface IStyledInputProps {
  isFocused: boolean;
}

interface IStyledInputContainerProps {
  isFocused: boolean;
}

interface IStyledInputLabelProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const StyledInputContainer = styled.View<IStyledInputContainerProps>`
  border: 1px solid;
  border-color: ${({ theme, isFocused }) => {
    if (isFocused) {
      return theme.colors.darkBlue.opacity[40];
    }
    return theme.colors.darkBlue.opacity[10];
  }};
  position: relative;
  min-height: ${verticalScale(64)}px;
  width: ${scale(312)}px;
  border-radius: 16px;
`;

export const StyledInputLabel = styled(Animated.Text)<IStyledInputLabelProps>`
  ${typographyStyles.paragraphThree}
  position: absolute;
  left: ${scale(20)}px;
  color: ${({ theme }) => theme.colors.grey.standard};
`;

export const StyledInput = styled.TextInput<IStyledInputProps>`
  padding-left: ${scale(20)}px;
  flex: 1;
  ${typographyStyles.paragraphTwo}
`;
