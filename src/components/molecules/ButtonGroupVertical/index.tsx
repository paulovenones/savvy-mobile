import { Button } from "../../atoms/Button";
import { StyledCallToActionButton } from "./styles";

interface IButtonGroupVerticalProps {
  primaryButtonText: string;
  primaryButtonOnPress: () => void;
  tertiaryButtonText: string;
  tertiaryButtonOnPress: () => void;
}

export const ButtonGroupVertical = ({
  primaryButtonText,
  primaryButtonOnPress,
  tertiaryButtonText,
  tertiaryButtonOnPress,
}: IButtonGroupVerticalProps) => {
  return (
    <>
      <StyledCallToActionButton
        onPress={primaryButtonOnPress}
        priority="PRIMARY"
      >
        {primaryButtonText}
      </StyledCallToActionButton>
      <Button onPress={tertiaryButtonOnPress} priority="TERTIARY">
        {tertiaryButtonText}
      </Button>
    </>
  );
};
