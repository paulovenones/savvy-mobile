import { ProgressBar } from "../../atoms/ProgressBar";
import { StyledFormHeaderContainer, StyledTitle } from "./styles";

export const FormHeader = () => {
  return (
    <StyledFormHeaderContainer>
      <ProgressBar />
      <StyledTitle
        title="Personal information"
        titleSize="MEDIUM"
        subtitle={
          "We ask for your personal information \n to verify your identity"
        }
      />
    </StyledFormHeaderContainer>
  );
};
