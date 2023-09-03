import { Animated } from "react-native";
import { verticalScale } from "react-native-size-matters";
import styled from "styled-components/native";

interface IStyledProgressBarContainerProps {
  width: number;
}

export const StyledProgressBarContainer = styled.View<IStyledProgressBarContainerProps>`
  width: ${(props) => props.width}px;
  height: ${verticalScale(8)}px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors["blue-10"]};
`;

export const StyledProgressBarFill = styled(Animated.View)`
  height: ${verticalScale(8)}px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors["blue"]};
`;
