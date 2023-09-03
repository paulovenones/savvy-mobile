import { scale, verticalScale } from "react-native-size-matters";
import styled from "styled-components/native";
import OButtonPriority from "../../../constants/OButtonPriority";
import { IIconButtonCommonProps } from ".";
import OButtonSize from "../../../constants/OButtonSize";

interface IStyledIconButtonProps extends IIconButtonCommonProps {
  isDisabled?: boolean;
}

export const StyledIconButton = styled.TouchableOpacity<IStyledIconButtonProps>`
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: ${({ theme, priority, isDisabled }) => {
    if (isDisabled) {
      return theme.colors["grey-disabled"];
    }

    switch (priority) {
      case OButtonPriority.PRIMARY:
        return theme.colors["blue"];
      case OButtonPriority.SECONDARY:
        return theme.colors["blue-dark"];
      case OButtonPriority.TERTIARY:
        return "transparent";
      default:
        return theme.colors.white;
    }
  }};
  padding: ${({ size }) => {
    switch (size) {
      case OButtonSize.SMALL:
        return `${scale(11)}`;
      case OButtonSize.MEDIUM:
        return `${scale(13)}`;
      case OButtonSize.LARGE:
        return `${scale(17)}`;
      default:
        10;
    }
  }}px;
`;
