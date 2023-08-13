import { ScreenTitleSize } from "../ScreenTitle";
import { StyledFormHeaderContainer, StyledTitle } from "./styles";

interface IFormHeader {
  title: string;
  subtitle?: string;
  titleSize?: ScreenTitleSize;
}

export const FormHeader = ({
  title,
  subtitle,
  titleSize = "MEDIUM",
}: IFormHeader) => {
  return (
    <StyledFormHeaderContainer>
      <StyledTitle title={title} titleSize={titleSize} subtitle={subtitle} />
    </StyledFormHeaderContainer>
  );
};
