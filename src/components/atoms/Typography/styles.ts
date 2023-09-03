import styled, { DefaultTheme } from "styled-components/native";
import { Text } from "react-native";
import { RuleSet } from "styled-components/native/dist/types";
import theme from "../../../styles/theme";

interface IStyledTypography {
  typographyStyle: RuleSet<object>;
  color?: keyof DefaultTheme["colors"];
}

export const StyledTypography = styled(Text)<IStyledTypography>`
  ${({ typographyStyle }) => typographyStyle};
  color: ${({ color }) =>
    color ? theme.colors[color] : theme.colors["blue-dark-80"]};
`;
