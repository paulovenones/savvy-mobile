import axios from "axios";
import { useEffect, useState } from "react";
import { UseFormGetValues } from "react-hook-form";

import { api } from "../../../../lib/axios";
import { CONSTANTS } from "../../../../constants";
import { maskEmail } from "../../../../utils/mask-email";

import { SignUpFormSchema } from "../..";
import { Margin } from "../../../../components/atoms/Margin";
import { DigitInput } from "../../../../components/molecules/DigitInput";
import { ScreenTitle } from "../../../../components/molecules/ScreenTitle";
import { TouchableLink } from "../../../../components/atoms/TouchableLink";

interface ISignUpFormStepCode {
  setIsStepCompleted: () => void;
  getValues: UseFormGetValues<SignUpFormSchema>;
  storeSignUpToken: React.Dispatch<React.SetStateAction<undefined>>;
}

const RESEND_CODE_SECONDS_INTERVAL = 60;

export const SignUpFormStepCode = ({
  getValues,
  setIsStepCompleted,
  storeSignUpToken,
}: ISignUpFormStepCode) => {
  const email = getValues().email;
  const maskedEmail = maskEmail(email);

  const onCompletePinTyping = async (value: string) => {
    try {
      const response = await api.post("/email-verification", {
        email,
        verificationPin: value,
      });
      const { signUpToken } = response.data;

      storeSignUpToken(signUpToken);

      setIsStepCompleted();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.status;
        if (statusCode === CONSTANTS.STATUS_CODES.BAD_REQUEST) {
          return "Código inválido";
        }
      }
    }
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setIsButtonDisabled(true);
    setCountdown(RESEND_CODE_SECONDS_INTERVAL);
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

  const onPressResendButton = async () => {
    if (!isButtonDisabled) {
      startCountdown();
      await api.post("/signup/init", { email });
    }
  };

  return (
    <>
      <ScreenTitle
        title="Insira o código de 4 dígitos"
        titleSize="MEDIUM"
        subtitle={`Código enviado para ${maskedEmail}`}
      />
      <Margin mt={72} mb={16}>
        <DigitInput onComplete={onCompletePinTyping} />
      </Margin>
      <TouchableLink
        color="blue"
        disabled={isButtonDisabled}
        onPress={onPressResendButton}
      >
        {isButtonDisabled ? `Reenviar (${countdown}s)` : "Reenviar"}
      </TouchableLink>
    </>
  );
};
