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
        isFixedSize={true}
        priority="PRIMARY"
      >
        {primaryButtonText}
      </StyledCallToActionButton>
      <Button
        onPress={tertiaryButtonOnPress}
        isFixedSize={true}
        priority="TERTIARY"
      >
        {tertiaryButtonText}
      </Button>
    </>
  );
};
