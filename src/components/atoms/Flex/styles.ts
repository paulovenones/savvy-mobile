import styled from "styled-components/native";
import { IFlexProps } from ".";
import { scale } from "react-native-size-matters";

export const StyledFlexContainer = styled.View<IFlexProps>`
  flex-direction: ${(props) => props.flexDirection || "column"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "stretch"};
  flex: ${(props) => (props.flex !== undefined ? props.flex : "0 1 auto")};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
  gap: ${(props) => (props.gap ? scale(props.gap) + "px" : 0)};
`;
