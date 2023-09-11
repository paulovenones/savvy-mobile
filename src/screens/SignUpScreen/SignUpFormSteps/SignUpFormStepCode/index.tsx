import axios from "axios";
import { UseFormGetValues } from "react-hook-form";

import { api } from "../../../../lib/axios";
import { CONSTANTS } from "../../../../constants";
import { maskEmail } from "../../../../utils/mask-email";

import { SignUpFormSchema } from "../..";
import { Margin } from "../../../../components/atoms/Margin";
import { DigitInput } from "../../../../components/molecules/DigitInput";
import { ScreenTitle } from "../../../../components/molecules/ScreenTitle";
import { TouchableLink } from "../../../../components/atoms/TouchableLink";
import { TwoStepVerification } from "../../../../components/organisms/TwoStepVerification";

interface ISignUpFormStepCode {
  setIsStepCompleted: () => void;
  getValues: UseFormGetValues<SignUpFormSchema>;
  storeSignUpToken: React.Dispatch<React.SetStateAction<string | null>>;
}

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
        console.error(err);
      }
      console.error(err);
    }
  };

  const onPressResendButton = async () => {
    await api.post("/signup/init", { email });
  };

  return (
    <>
      <ScreenTitle
        title="Insira o código de 4 dígitos"
        titleSize="MEDIUM"
        subtitle={`Código enviado para ${maskedEmail}`}
      />
      <Margin mt={72}>
        <TwoStepVerification
          handlResendClick={onPressResendButton}
          handleCompletePinTyping={onCompletePinTyping}
        />
      </Margin>
    </>
  );
};
