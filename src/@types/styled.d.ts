import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: {
        default: string;
        card: string;
      };
      blue: {
        standard: string;
        light: string;
        opacity: {
          10: string;
        };
      };
      darkBlue: {
        standard: string;
        opacity: {
          10: string;
          40: string;
          80: string;
        };
      };
      white: string;
      grey: {
        standard: string;
        light: string;
        disabled: string;
      };
    };
  }
}
