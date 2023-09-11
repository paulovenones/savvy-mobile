import React, { useMemo, useState } from "react";
import { ContentView } from "../../../../components/templates/ContentView";
import { Flex } from "../../../../components/atoms/Flex";
import { Typography } from "../../../../components/atoms/Typography";
import { Margin } from "../../../../components/atoms/Margin";
import { Input } from "../../../../components/atoms/Input";
import { IconButton } from "../../../../components/atoms/IconButton";
import {
  Control,
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormTrigger,
} from "react-hook-form";
import { PasswordResetFormSchema } from "../..";

import NavigateNext from "../../../../assets/navigateNext.svg";
import { api } from "../../../../lib/axios";

interface IPasswordResetStepEmailProps {
  control: Control<PasswordResetFormSchema, any>;
  trigger: UseFormTrigger<PasswordResetFormSchema>;
  clearErrors: UseFormClearErrors<PasswordResetFormSchema>;
  errors: FieldErrors<PasswordResetFormSchema>;
  dirtyFields: Partial<
    Readonly<FieldNamesMarkedBoolean<PasswordResetFormSchema>>
  >;
  setIsStepCompleted: () => void;
  getValues: UseFormGetValues<PasswordResetFormSchema>;
}

export const PasswordResetStepEmail: React.FC<IPasswordResetStepEmailProps> = ({
  control,
  trigger,
  clearErrors,
  errors,
  dirtyFields,
  setIsStepCompleted,
  getValues,
}) => {
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  const handleInitPasswordReset = async () => {
    setIsProcessingRequest(true);

    const { email } = getValues();

    if (!email) {
      return;
    }

    try {
      await api.get(`/user/forgot-password/${email}`);
      setIsStepCompleted();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessingRequest(false);
    }
  };

  const isActionButtonDisabled = useMemo(() => {
    return !!errors.email || !dirtyFields.email || isProcessingRequest;
  }, [dirtyFields, errors.email, isProcessingRequest]);

  return (
    <Flex gap={24}>
      <Flex alignItems="center">
        <Typography color="blue-dark" variant="headlineTwo">
          Esqueceu sua senha?
        </Typography>
        <Margin mt={4}>
          <Typography variant="paragraphThree">
            Digite seu email para recuperá-la
          </Typography>
        </Margin>
      </Flex>
      <Input
        control={control}
        trigger={trigger}
        clearErrors={clearErrors}
        label="Email"
        name="email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        autoCorrect={false}
        spellCheck={false}
        hasError={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <Flex alignItems="flex-end">
        <IconButton
          disabled={isActionButtonDisabled}
          onPress={handleInitPasswordReset}
          priority="SECONDARY"
          size="LARGE"
        >
          <NavigateNext />
        </IconButton>
      </Flex>
    </Flex>
  );
};
