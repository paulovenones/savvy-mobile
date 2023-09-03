import { scale, verticalScale } from "react-native-size-matters";
import OButtonPriorityEnum from "../../../constants/OButtonPriority";
import styled from "styled-components/native";

interface IStyledButtonProps {
  priority: (typeof OButtonPriorityEnum)[keyof typeof OButtonPriorityEnum];
  isFullWidth: boolean;
  isDisabled?: boolean;
}

export const StyledButton = styled.TouchableOpacity<IStyledButtonProps>`
  align-items: center;
  justify-content: center;

  border-radius: 16px;
  background-color: ${({ theme, priority, isDisabled }) => {
    if (isDisabled) {
      return theme.colors["grey-disabled"];
    }

    if (priority === OButtonPriorityEnum.PRIMARY) {
      return theme.colors["blue"];
    }
    if (priority === OButtonPriorityEnum.SECONDARY) {
      return theme.colors["blue-dark"];
    }
    if (priority === OButtonPriorityEnum.TERTIARY) {
      return "transparent";
    }
  }};
  ${({ isFullWidth }) => (isFullWidth ? `width: ${scale(312)}px` : "")};
  padding: 0px ${verticalScale(24)}px;
`;

export const StyledButtonContent = styled.View`
  padding: 16px 0px;
`;
