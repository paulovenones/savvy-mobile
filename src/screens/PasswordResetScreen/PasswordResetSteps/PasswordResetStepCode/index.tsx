import { UseFormGetValues } from "react-hook-form";
import { Flex } from "../../../../components/atoms/Flex";
import { Margin } from "../../../../components/atoms/Margin";
import { Typography } from "../../../../components/atoms/Typography";
import { PasswordResetFormSchema } from "../..";
import { useMemo } from "react";
import { maskEmail } from "../../../../utils/mask-email";
import { api } from "../../../../lib/axios";
import { CONSTANTS } from "../../../../constants";
import axios from "axios";
import { TwoStepVerification } from "../../../../components/organisms/TwoStepVerification";

interface IPasswordResetStepCodeProps {
  getValues: UseFormGetValues<PasswordResetFormSchema>;
  setIsStepCompleted: () => void;
  storePasswordResetPin: React.Dispatch<React.SetStateAction<null | string>>;
}

export const PasswordResetStepCode: React.FC<IPasswordResetStepCodeProps> = ({
  getValues,
  setIsStepCompleted,
  storePasswordResetPin,
}) => {
  const email = useMemo(() => getValues().email, [getValues, maskEmail]);

  const maskedEmail = useMemo(() => maskEmail(email), [email, maskEmail]);

  const onCompletePinTyping = async (value: string) => {
    try {
      await api.post("/user/forgot-password/verify-pin", {
        email,
        verificationPin: value,
      });

      storePasswordResetPin(value);

      setIsStepCompleted();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.status;
        if (statusCode === CONSTANTS.STATUS_CODES.UNAUTHORIZED) {
          return "Código inválido";
        }
        console.error(err);
      }
      console.error(err);
    }
  };

  const onPressResendButton = async () => {
    await api.get(`/user/forgot-password/${email}`);
  };

  return (
    <Flex>
      <Flex alignItems="center">
        <Typography color="blue-dark" variant="headlineTwo">
          Insira o código de 4 dígitos
        </Typography>
        <Margin mt={4}>
          <Typography variant="paragraphThree">
            Código enviado para {maskedEmail}
          </Typography>
        </Margin>
      </Flex>
      <Margin mt={72}>
        <TwoStepVerification
          handlResendClick={onPressResendButton}
          handleCompletePinTyping={onCompletePinTyping}
        />
      </Margin>
    </Flex>
  );
};
