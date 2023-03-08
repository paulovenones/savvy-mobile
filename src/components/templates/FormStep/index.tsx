import { ProgressBar } from "../../atoms/ProgressBar";
import { ScreenTitle } from "../../molecules/ScreenTitle";
import { StyledFormStepContainer } from "./styles";

export const FormStep = () => {
  return (
    <StyledFormStepContainer>
      <ProgressBar />
      <ScreenTitle
        title="Personal information"
        titleSize="MEDIUM"
        subtitle={
          "We ask for your personal information \n to verify your identity"
        }
      />
    </StyledFormStepContainer>
  );
};
