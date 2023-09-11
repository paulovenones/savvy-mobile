import { useEffect, useState } from "react";
import { Flex } from "../../atoms/Flex";
import { Margin } from "../../atoms/Margin";
import { TouchableLink } from "../../atoms/TouchableLink";
import { DigitInput } from "../../molecules/DigitInput";

interface ITwoStepVerificationProps {
  handlResendClick: () => Promise<void>;
  handleCompletePinTyping: (
    value: string,
    index: number
  ) => void | string | Promise<string | void>;
}

const RESEND_CODE_SECONDS_INTERVAL = 60;

export const TwoStepVerification: React.FC<ITwoStepVerificationProps> = ({
  handlResendClick,
  handleCompletePinTyping,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setIsButtonDisabled(true);
    setCountdown(RESEND_CODE_SECONDS_INTERVAL);
  };

  const onPressResendButton = async () => {
    if (!isButtonDisabled) {
      startCountdown();
      try {
        await handlResendClick();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }

    return () => clearInterval(intervalId);
  }, [countdown]);

  return (
    <Flex alignItems="center">
      <Margin mb={16}>
        <DigitInput onComplete={handleCompletePinTyping} />
      </Margin>
      <TouchableLink
        color="blue"
        disabled={isButtonDisabled}
        onPress={onPressResendButton}
      >
        {isButtonDisabled ? `Reenviar (${countdown}s)` : "Reenviar"}
      </TouchableLink>
    </Flex>
  );
};
