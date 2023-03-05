// import original module declarations
import "styled-components";

// and extend them!
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
      };
      darkBlue: string;
      white: string;
      grey: {
        standard: string;
        light: string;
        disabled: string;
      };
    };
  }
}
