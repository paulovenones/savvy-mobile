import styled from "styled-components/native";
import { typographyStyles } from "../Typography";
import { verticalScale, scale } from "react-native-size-matters";
import { TextInputProps } from "react-native";

interface IStyledCodeInputProps extends TextInputProps {
  isActive: boolean;
}

export const StyledCodeInput = styled.TextInput<IStyledCodeInputProps>`
  border-width: 2px;
  text-align: center;
  height: ${verticalScale(56)}px;
  width: ${scale(56)}px;
  border-radius: ${scale(16)}px;
  ${typographyStyles.headlineFive}
  line-height: 0;
  border-color: ${({ theme, isActive }) => {
    if (isActive) {
      return theme.colors.darkBlue.opacity[40];
    }

    return theme.colors.darkBlue.opacity[10];
  }};
`;
