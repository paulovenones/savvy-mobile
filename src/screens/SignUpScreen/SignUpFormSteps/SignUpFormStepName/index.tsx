import {
  Control,
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormClearErrors,
  UseFormTrigger,
} from "react-hook-form";

import { SignUpFormSchema } from "../..";
import { Flex } from "../../../../components/atoms/Flex";
import { Input } from "../../../../components/atoms/Input";
import { Margin } from "../../../../components/atoms/Margin";
import { IconButton } from "../../../../components/atoms/IconButton";
import { ScreenTitle } from "../../../../components/molecules/ScreenTitle";

import NavigateNext from "../../../../assets/navigateNext.svg";

interface ISignUpFormStepNameProps {
  control: Control<SignUpFormSchema, any>;
  errors: FieldErrors<SignUpFormSchema>;
  setIsStepCompleted: () => void;
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<SignUpFormSchema>>>;
  trigger: UseFormTrigger<SignUpFormSchema>;
  clearErrors: UseFormClearErrors<SignUpFormSchema>;
}

export const SignUpFormStepName = ({
  control,
  errors,
  setIsStepCompleted,
  dirtyFields,
  trigger,
  clearErrors,
}: ISignUpFormStepNameProps) => {
  const isActionButtonDisabled = !!errors.name || !dirtyFields.name;

  const handleCompleteFormStep = () => {
    setIsStepCompleted();
  };

  return (
    <>
      <ScreenTitle title="Como podemos te chamar?" />
      <Margin mt={24}>
        <Input
          trigger={trigger}
          clearErrors={clearErrors}
          control={control}
          name="name"
          autoComplete="name"
          label="Nome"
          hasError={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Margin mt={24}>
          <Flex alignItems="flex-end">
            <IconButton
              disabled={isActionButtonDisabled}
              onPress={handleCompleteFormStep}
              priority="SECONDARY"
              size="LARGE"
            >
              <NavigateNext />
            </IconButton>
          </Flex>
        </Margin>
      </Margin>
    </>
  );
};
