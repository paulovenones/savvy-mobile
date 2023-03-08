import { StyleProp, View, ViewStyle } from "react-native";

import OButtonPriorityEnum from "../../../constants/OButtonPriority";
import { StyledButton, SytledButtonText } from "./styles";

interface IButtonProps {
  children: string;
  priority: typeof OButtonPriorityEnum[keyof typeof OButtonPriorityEnum];
  isEnabled?: boolean;
  isFixedSize?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export function Button({
  children,
  priority,
  isEnabled = true,
  isFixedSize = false,
  style,
  onPress,
}: IButtonProps) {
  return (
    <View style={style}>
      <StyledButton
        isFixedSize={isFixedSize}
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
