import { ReactNode } from "react";
import { View } from "react-native";

import OButtonPriorityEnum from "../../../constants/OButtonPriority";
import OButtonSize from "../../../constants/OButtonSize";

import { StyledIconButton } from "./styles";
import React from "react";
import theme from "../../../styles/theme";

export interface IIconButtonCommonProps {
  priority: (typeof OButtonPriorityEnum)[keyof typeof OButtonPriorityEnum];
  size: (typeof OButtonSize)[keyof typeof OButtonSize];
  disabled?: boolean;
}

interface IIconButtonProps extends IIconButtonCommonProps {
  children: any;
  onPress: () => void;
}

export function IconButton({
  children,
  priority,
  size = "MEDIUM",
  onPress,
  disabled = false,
}: IIconButtonProps) {
  const handleButtonPress = () => {
    if (disabled) {
      return;
    }

    onPress();
  };

  const getIconColor = () => {
    if (
      disabled ||
      priority === OButtonPriorityEnum.PRIMARY ||
      priority === OButtonPriorityEnum.SECONDARY
    ) {
      return theme.colors.white;
    }

    return theme.colors["blue-dark"];
  };

  const updatedChildren = React.Children.map(children, (child, idx) =>
    React.cloneElement(child, {
      style: { ...child.props.style, color: getIconColor() },
    })
  );

  return (
    <View>
      <StyledIconButton
        priority={priority}
        isDisabled={disabled}
        size={size}
        activeOpacity={0.7}
        onPress={handleButtonPress}
      >
        {updatedChildren}
      </StyledIconButton>
    </View>
  );
}
