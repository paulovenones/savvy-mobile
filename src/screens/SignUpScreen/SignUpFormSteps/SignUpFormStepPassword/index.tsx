import { Control, FieldErrors, FieldNamesMarkedBoolean } from "react-hook-form";
import { useMemo, useState } from "react";

import {
  checkHasMinimumLength,
  checkHasNumber,
  checkHasSpecialCharacter,
  checkHasUppercaseLetter,
} from "../../../../utils/validate-password-strength";

import { SignUpFormSchema } from "../..";
import { Chip } from "../../../../components/atoms/Chip";
import { Flex } from "../../../../components/atoms/Flex";
import { Input } from "../../../../components/atoms/Input";
import { Margin } from "../../../../components/atoms/Margin";
import { Button } from "../../../../components/atoms/Button";
import { ScreenTitle } from "../../../../components/molecules/ScreenTitle";
import { KeyboardScrollView } from "../../../../components/atoms/KeyboardScrollView";

interface ISignUpFormStepPasswordProps {
  control: Control<SignUpFormSchema, any>;
  errors: FieldErrors<SignUpFormSchema>;
  setIsStepCompleted: () => void;
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<SignUpFormSchema>>>;
  onFinishSignUp: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

export const SignUpFormStepPassword = ({
  control,
  errors,
  setIsStepCompleted,
  dirtyFields,
  onFinishSignUp,
}: ISignUpFormStepPasswordProps) => {
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  const [passwordStrengthErrors, setPasswordStrengthErrors] = useState({
    mininumLength: true,
    specialChar: true,
    uppercaseLetter: true,
    number: true,
  });

  const hasPasswordStrengthErrors = useMemo(() => {
    const hasErrors = Object.values(passwordStrengthErrors).includes(true);

    return hasErrors;
  }, [passwordStrengthErrors]);

  const hasPasswordErrors = !!errors.password || !!errors.passwordConfirm;
  const arePasswordsDirty =
    !!dirtyFields.password && !!dirtyFields.passwordConfirm;

  const isActionButtonDisabled =
    hasPasswordErrors ||
    !arePasswordsDirty ||
    hasPasswordStrengthErrors ||
    isProcessingRequest;

  const handleCompleteFormStep = async () => {
    try {
      setIsProcessingRequest(true);
      await onFinishSignUp();
      setIsStepCompleted();
    } catch (e) {
    } finally {
      setIsProcessingRequest(false);
    }
  };

  const checkPasswordStrength = (password: string) => {
    const newPasswordStrengthErrors = { ...passwordStrengthErrors };

    const minimumLengthError = !checkHasMinimumLength(password);
    const specialCharError = !checkHasSpecialCharacter(password);
    const uppercaseError = !checkHasUppercaseLetter(password);
    const numberError = !checkHasNumber(password);

    newPasswordStrengthErrors.mininumLength = minimumLengthError;
    newPasswordStrengthErrors.specialChar = specialCharError;
    newPasswordStrengthErrors.uppercaseLetter = uppercaseError;
    newPasswordStrengthErrors.number = numberError;

    setPasswordStrengthErrors(newPasswordStrengthErrors);
  };

  return (
    <>
      <ScreenTitle
        title="Quase lá!"
        subtitle="Para finalizar, escolha uma senha"
      />
      <KeyboardScrollView>
        <Margin mt={24}>
          <Flex>
            <Flex>
              <Input
                control={control}
                name="password"
                label="Senha"
                secureTextEntry={true}
                hasError={!!errors.password}
                errorMessage={errors.password?.message}
                onChangeText={checkPasswordStrength}
              />
              <Margin mt={8}>
                <Flex
                  alignItems="flex-start"
                  justifyContent="center"
                  flexDirection="row"
                  flexWrap="wrap"
                  gap={4}
                >
                  <Chip
                    color={
                      passwordStrengthErrors.mininumLength
                        ? "red-light"
                        : "green-light"
                    }
                  >
                    8 caracteres
                  </Chip>
                  <Chip
                    color={
                      passwordStrengthErrors.uppercaseLetter
                        ? "red-light"
                        : "green-light"
                    }
                  >
                    letra maiúscula
                  </Chip>
                  <Chip
                    color={
                      passwordStrengthErrors.specialChar
                        ? "red-light"
                        : "green-light"
                    }
                  >
                    caractere especial
                  </Chip>
                  <Chip
                    color={
                      passwordStrengthErrors.number
                        ? "red-light"
                        : "green-light"
                    }
                  >
                    número
                  </Chip>
                </Flex>
              </Margin>
            </Flex>
            <Margin mt={8}>
              <Input
                control={control}
                name="passwordConfirm"
                label="Confirme sua senha"
                secureTextEntry={true}
                hasError={!!errors.passwordConfirm}
                errorMessage={errors.passwordConfirm?.message}
              />
            </Margin>
          </Flex>
          <Margin mt={24}>
            <Flex alignItems="flex-end">
              <Button
                priority="PRIMARY"
                disabled={isActionButtonDisabled}
                onPress={handleCompleteFormStep}
              >
                Finalizar cadastro
              </Button>
            </Flex>
          </Margin>
        </Margin>
      </KeyboardScrollView>
    </>
  );
};
