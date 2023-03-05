import { Button } from "../../atoms/Button";
import { StyledCallToActionButton } from "./styles";

export const ButtonGroupVertical = () => {
  return (
    <>
      <StyledCallToActionButton isFixedSize={true} priority="PRIMARY">
        Get started
      </StyledCallToActionButton>
      <Button isFixedSize={true} priority="TERTIARY">
        Sign In
      </Button>
    </>
  );
};
