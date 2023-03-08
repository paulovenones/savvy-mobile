import { scale, verticalScale } from "react-native-size-matters";
import OButtonPriorityEnum from "../../../constants/OButtonPriority";
import styled from "styled-components/native";

interface IStyledButtonProps {
  priority: typeof OButtonPriorityEnum[keyof typeof OButtonPriorityEnum];
  isFixedSize: boolean;
}

export const StyledButton = styled.TouchableOpacity<IStyledButtonProps>`
  align-items: center;
  justify-content: center;

  border-radius: 16px;
  background-color: ${({ theme, priority }) => {
    if (priority === OButtonPriorityEnum.primary) {
      return theme.colors.blue.standard;
    }
    if (priority === OButtonPriorityEnum.secondary) {
      return theme.colors.darkBlue.standard;
    }
    if (priority === OButtonPriorityEnum.tertiary) {
      return "transparent";
    }
  }};
  ${({ isFixedSize }) => (isFixedSize ? `width: ${scale(312)}px` : "")};
  padding: 0px ${verticalScale(24)}px;
`;

export const SytledButtonText = styled.Text`
  font-size: ${scale(16)}px;
  line-height: 26px;
  font-weight: 700;

  padding: 16px 0px;
  color: ${({ theme }) => theme.colors.white};
`;
