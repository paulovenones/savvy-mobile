import { StyleProp, View, ViewStyle } from "react-native";

import OButtonPriorityEnum from "../../../constants/OButtonPriority";
import { StyledButton, SytledButtonText } from "./styles";

interface IButtonProps {
  children: string;
  priority: (typeof OButtonPriorityEnum)[keyof typeof OButtonPriorityEnum];
  isEnabled?: boolean;
  isFullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export function Button({
  children,
  priority,
  isEnabled = true,
  isFullWidth = true,
  style,
  onPress,
}: IButtonProps) {
  return (
    <View style={style}>
      <StyledButton
        isFullWidth={isFullWidth}
        priority={priority}
        activeOpacity={0.7}
        disabled={!isEnabled}
        onPress={onPress}
      >
        <SytledButtonText>{children}</SytledButtonText>
      </StyledButton>
    </View>
  );
}
