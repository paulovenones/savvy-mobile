import {
  Control,
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormTrigger,
} from "react-hook-form";
import { PasswordResetFormSchema } from "../..";
import { useMemo, useRef, useState } from "react";
import {
  checkHasMinimumLength,
  checkHasNumber,
  checkHasSpecialCharacter,
  checkHasUppercaseLetter,
} from "../../../../utils/validate-password-strength";
import { ScreenTitle } from "../../../../components/molecules/ScreenTitle";
import { Margin } from "../../../../components/atoms/Margin";
import { Flex } from "../../../../components/atoms/Flex";
import { Input } from "../../../../components/atoms/Input";
import { Chip } from "../../../../components/atoms/Chip";
import { Button } from "../../../../components/atoms/Button";
import LottieView from "lottie-react-native";
import successAnimation from "../../../../assets/animations/success.json";
import { useNavigation } from "@react-navigation/native";

interface IPasswordResetStepNewProps {
  control: Control<PasswordResetFormSchema, any>;
  trigger: UseFormTrigger<PasswordResetFormSchema>;
  clearErrors: UseFormClearErrors<PasswordResetFormSchema>;
  errors: FieldErrors<PasswordResetFormSchema>;
  dirtyFields: Partial<
    Readonly<FieldNamesMarkedBoolean<PasswordResetFormSchema>>
  >;
  setIsStepCompleted: () => void;
  getValues: UseFormGetValues<PasswordResetFormSchema>;
  onFinishPasswordReset: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

export const PasswordResetStepNew: React.FC<IPasswordResetStepNewProps> = ({
  control,
  errors,
  setIsStepCompleted,
  dirtyFields,
  trigger,
  clearErrors,
  onFinishPasswordReset,
}) => {
  const animation = useRef<any>(null);

  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [passwordStrengthErrors, setPasswordStrengthErrors] = useState({
    mininumLength: true,
    specialChar: true,
    uppercaseLetter: true,
    number: true,
  });

  const { navigate } = useNavigation();

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
      await onFinishPasswordReset();
      setPasswordResetSuccess(true);
      setTimeout(() => {
        navigate("signin");
        setIsStepCompleted();
      }, 2000);
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

  if (passwordResetSuccess) {
    return (
      <Flex alignItems="center" justifyContent="center" flex={1}>
        <LottieView
          autoPlay
          loop={false}
          ref={animation}
          style={{
            width: 200,
            height: 200,
          }}
          source={successAnimation}
        />
      </Flex>
    );
  }

  return (
    <Flex>
      <ScreenTitle
        title="Quase lá!"
        subtitle="Para finalizar, escolha uma nova senha"
      />
      <Margin mt={24}>
        <Flex>
          <Flex>
            <Input
              trigger={trigger}
              clearErrors={clearErrors}
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
                    passwordStrengthErrors.number ? "red-light" : "green-light"
                  }
                >
                  número
                </Chip>
              </Flex>
            </Margin>
          </Flex>
          <Margin mt={8}>
            <Input
              trigger={trigger}
              clearErrors={clearErrors}
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
              Redefinir senha
            </Button>
          </Flex>
        </Margin>
      </Margin>
    </Flex>
  );
};
