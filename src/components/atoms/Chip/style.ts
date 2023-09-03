import { scale } from "react-native-size-matters";
import { DefaultTheme, styled } from "styled-components/native";
import theme from "../../../styles/theme";
import { IChipCommonProps } from ".";

interface IStyledChipContainerProps extends IChipCommonProps {}

type ChipColor = {
  background: keyof DefaultTheme["colors"];
  text: keyof DefaultTheme["colors"];
  outlined: keyof DefaultTheme["colors"];
};

export const chipColorOptions = {
  red: {
    background: "red",
    text: "white",
    outlined: "red",
  },
  "red-light": {
    background: "red-light",
    text: "red",
    outlined: "red",
  },
  green: {
    background: "green",
    text: "white",
    outlined: "green",
  },
  "green-light": {
    background: "green-light",
    text: "green",
    outlined: "green",
  },
  blue: {
    background: "blue",
    text: "white",
    outlined: "blue",
  },
  "blue-light": {
    background: "grey-light",
    text: "blue",
    outlined: "blue",
  },
} as const;

type ChipColorOptions = keyof typeof chipColorOptions;

export const allChipColors: Record<ChipColorOptions | "disabled", ChipColor> = {
  ...chipColorOptions,
  disabled: {
    background: "grey-disabled",
    text: "white-60",
    outlined: "grey-disabled",
  },
};

export const StyledChipContainer = styled.View<IStyledChipContainerProps>`
  align-items: center;
  justify-content: center;

  padding: ${scale(6)}px ${scale(10)}px;
  background-color: ${({ theme, disabled, color, outlined }) => {
    if (outlined) {
      return "transparent";
    }

    if (disabled) {
      return theme.colors[allChipColors.disabled.background];
    }

    const selectedColorBckground = allChipColors[color].background;

    return theme.colors[selectedColorBckground];
  }};

  border: ${({ outlined, color, disabled }) => {
    if (!outlined) {
      return "none";
    }

    if (disabled) {
      return theme.colors[allChipColors.disabled.outlined];
    }

    const borderColor = allChipColors[color].outlined;

    return `1px ${theme.colors[borderColor]}`;
  }};

  border-radius: ${scale(12)}px;
`;
