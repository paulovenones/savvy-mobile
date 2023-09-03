import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      "background-default": string;
      "background-card": string;
      blue: string;
      "blue-light": string;
      "blue-10": string;
      "blue-dark": string;
      "blue-dark-10": string;
      "blue-dark-40": string;
      "blue-dark-80": string;
      white: string;
      "white-60": string;
      grey: string;
      "grey-light": string;
      "grey-disabled": string;
      warning: string;
      "warning-light": string;
      green: string;
      "green-light": string;
      red: string;
      "red-light": string;
    };
  }
}
