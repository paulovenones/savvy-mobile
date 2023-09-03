import { ReactNode } from "react";
import { StyledFlexContainer } from "./styles";
import { ViewProps } from "react-native";

export interface IFlexProps extends ViewProps {
  children?: ReactNode;
  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
  flex?: number;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: number;
}

export const Flex = ({ children, ...rest }: IFlexProps) => {
  return <StyledFlexContainer {...rest}>{children}</StyledFlexContainer>;
};
