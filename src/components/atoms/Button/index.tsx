import { StyleProp, View, ViewStyle } from "react-native";

import OButtonPriorityEnum from "../../../constants/OButtonPriority";
import { StyledButton, SytledButtonText } from "./styles";

interface IButtonProps {
  children: string;
  priority: typeof OButtonPriorityEnum[keyof typeof OButtonPriorityEnum];
  isEnabled?: boolean;
  isFixedSize?: boolean;
  shouldShowPlusIcon?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  children,
  priority,
  isEnabled = true,
  isFixedSize = false,
  shouldShowPlusIcon = false,
  style,
}: IButtonProps) {
  return (
    <View style={style}>
      <StyledButton
        isFixedSize={isFixedSize}
        priority={priority}
        activeOpacity={0.7}
        disabled={!isEnabled}
      >
        <SytledButtonText>{children}</SytledButtonText>
      </StyledButton>
    </View>
  );
}
