import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ReactNode } from "react";
import { ITypographyProps, Typography, typographyStyles } from "../Typography";
import { DefaultTheme } from "styled-components/native";

interface ITouchableLink extends TouchableOpacityProps {
  color: keyof DefaultTheme["colors"];
  children?: ReactNode;
  onPress?: () => void;
  variant?: keyof typeof typographyStyles;
}

export const TouchableLink = ({
  onPress,
  children,
  disabled,
  color,
  variant = "button",
  ...rest
}: ITouchableLink) => {
  const textColor: ITypographyProps["color"] = disabled
    ? "grey-disabled"
    : color;

  return (
    <TouchableOpacity {...rest} disabled={disabled} onPress={onPress}>
      <Typography color={textColor} variant={variant}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};
