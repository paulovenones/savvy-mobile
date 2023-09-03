import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import OButtonPriorityEnum from "../../../constants/OButtonPriority";
import OButtonSize from "../../../constants/OButtonSize";

import { Typography } from "../Typography";

import { StyledButton, StyledButtonContent } from "./styles";

interface IButtonProps {
  children: ReactNode;
  priority: (typeof OButtonPriorityEnum)[keyof typeof OButtonPriorityEnum];
  size?: (typeof OButtonSize)[keyof typeof OButtonSize];
  isFullWidth?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export function Button({
  children,
  priority,
  isFullWidth = true,
  size = "LARGE",
  style,
  onPress,
  disabled = false,
}: IButtonProps) {
  const handleButtonPress = () => {
    if (disabled) {
      return;
    }

    onPress();
  };

  return (
    <View style={style}>
      <StyledButton
        isFullWidth={isFullWidth}
        priority={priority}
        activeOpacity={0.7}
        isDisabled={disabled}
        onPress={handleButtonPress}
      >
        <StyledButtonContent>
          {typeof children === "string" ? (
            <Typography variant="button" color="white">
              {children}
            </Typography>
          ) : (
            children
          )}
        </StyledButtonContent>
      </StyledButton>
    </View>
  );
}
