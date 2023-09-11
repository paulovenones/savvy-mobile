import {
  Control,
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormTrigger,
} from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { api } from "../../../../lib/axios";
import { CONSTANTS } from "../../../../constants";

import { SignUpFormSchema } from "../..";
import { Flex } from "../../../../components/atoms/Flex";
import { Input } from "../../../../components/atoms/Input";
import { Button } from "../../../../components/atoms/Button";
import { Margin } from "../../../../components/atoms/Margin";
import { Typography } from "../../../../components/atoms/Typography";
import { ScreenTitle } from "../../../../components/molecules/ScreenTitle";
import { TouchableLink } from "../../../../components/atoms/TouchableLink";

interface ISignUpFormStepEmailProps {
  control: Control<SignUpFormSchema, any>;
  setIsStepCompleted: () => void;
  getValues: UseFormGetValues<SignUpFormSchema>;
  errors: FieldErrors<SignUpFormSchema>;
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<SignUpFormSchema>>>;
  trigger: UseFormTrigger<SignUpFormSchema>;
  clearErrors: UseFormClearErrors<SignUpFormSchema>;
}

export const SignUpFormStepEmail = ({
  errors,
  control,
  setIsStepCompleted,
  getValues,
  dirtyFields,
  trigger,
  clearErrors,
}: ISignUpFormStepEmailProps) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const isActionButtonDisabled =
    isLoading || !!errors.email || !dirtyFields.email;

  const handleSignInPress = () => {
    navigation.navigate("signin");
  };

  const handleInitSignUp = async () => {
    setIsLoading(true);
    try {
      const email = getValues().email;
      await api.post("/signup/init", { email });
      setIsStepCompleted();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
        const statusCode = err.response?.status;
        if (statusCode === CONSTANTS.STATUS_CODES.CONFLICT) {
          control.setError("email", {
            message: "Email já cadastrado na plataforma",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScreenTitle title="Vamos começar" titleSize="LARGE" />
      <Margin mt={98}>
        <Input
          trigger={trigger}
          clearErrors={clearErrors}
          control={control}
          name="email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          autoCorrect={false}
          spellCheck={false}
          label="Email"
          hasError={!!errors.email}
          errorMessage={errors.email?.message}
        />
      </Margin>
      <Margin mt={16}>
        <Button
          disabled={isActionButtonDisabled}
          onPress={handleInitSignUp}
          priority="SECONDARY"
        >
          Enviar código
        </Button>
      </Margin>
      <Margin mt={16}>
        <Flex flexDirection="row" alignItems="center">
          <Typography variant="paragraphThree">Já tem uma conta?</Typography>
          <Margin ml={12}>
            <TouchableLink color="blue" onPress={handleSignInPress}>
              Entrar
            </TouchableLink>
          </Margin>
        </Flex>
      </Margin>
    </>
  );
};
