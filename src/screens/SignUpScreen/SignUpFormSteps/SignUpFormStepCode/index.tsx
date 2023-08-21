import { Control, FieldValues } from "react-hook-form";
import { Typography } from "../../../../components/atoms/Typography";
import { ScreenTitle } from "../../../../components/molecules/ScreenTitle";
import { DigitInput } from "../../../../components/atoms/DigitInput";
import { Margin } from "../../../../components/atoms/Margin";
import { TouchableLink } from "../../../../components/atoms/TouchableLink";

interface ISignUpFormStepCode {
  control: Control<FieldValues, any>;
  setIsStepCompleted: () => void;
}

export const SignUpFormStepCode = ({}: ISignUpFormStepCode) => {
  return (
    <>
      <ScreenTitle
        title="Insira o código de 4 dígitos"
        titleSize="MEDIUM"
        subtitle="Código enviado para pa****s@gmail.com"
      />
      <Margin mt={72} mb={16}>
        <DigitInput
          onComplete={(value, index) =>
            console.log("completed ==> ", value, index)
          }
        />
      </Margin>
      <TouchableLink>Reenviar</TouchableLink>
    </>
  );
};
